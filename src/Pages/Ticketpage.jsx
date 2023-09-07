import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import './Ticketpage.css';

function Ticket() {
  const token = localStorage.getItem('token');
  const user = parseInt(localStorage.getItem('id'), 10);  console.log(typeof(user))
  const initialValues = {
    user: user,
    movie: '',
    seat_number: [1,2],
    total_cost: "",
  };

  const validationSchema = Yup.object({
    movie: Yup.string().required('Movie is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/booking/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log('Booking is successful');
        console.log(values)
        // You can handle success, e.g., show a confirmation message
      } else {
        console.error('Booking failed');
        console.log(values)
        // Handle failure or display an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error or display an error message
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div>
          <h3>BOOKING A MOVIE</h3>
          <Form className="text">
          <div className="mb-3">
              <label htmlFor="user" className="form-label">
                USER
              </label>
              <Field
                id="user"
                name="user"
                className="form-control"
              />
              <ErrorMessage name="user" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="movie" className="form-label">
                MOVIE
              </label>
              <Field
              type="number"
                id="movie"
                name="movie"
                className="form-control"
              />
              <ErrorMessage name="movie" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="seat_number" className="form-label">
                Seat number
              </label>
              <Field
                id="seat_number"
                name="seat_number"
                className="form-control"
              />
              <ErrorMessage name="seat_number" component="div" className="text-danger" />
              
            </div>
            <div className="mb-3">
    
               <label htmlFor="total_cost" className="form-label">
                    Total Cost
                  </label>
              <Field
                type="number"
                id="total_cost"
                name="total_cost"
                className="form-control"
              />
              <ErrorMessage name="total_cost" component="div" className="text-danger" />
              
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Booking...' : 'Booked'}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Ticket;
