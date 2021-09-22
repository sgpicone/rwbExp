import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const BeerForm = (props) => {
    const [beer, setBeer] = useState({
        beerName: props.beer ? props.beer.name : '',
        beerStyle: props.beer ? props.beer.style : '',
        beerAbv: props.beer ? props.beer.abv : 0,
        beerIbu: props.beer ? props.beer.ibu : 0,
        beerSrm: props.beer ? props.beer.srm : 0,
        beerServeSize: props.beer ? props.beer.serveSize : 16,
        beerGroup: props.beer ? props.beer.group : '',
        beerDescription: props.beer ? props.beer.description : '',
        beerOnTap: props.beer ? props.beer.onTap : false,
        beerNonVegan: props.beer ? props.beer.nonVegan : false,
        beerShortDescription: props.beer ? props.beer.shortDescription : '',
        beerFlavorNotes: props.beer ? props.beer.flavorNotes : ''
    });

    return (
        <div>
            <h2>Add new beer</h2>
            <Formik
                initialValues={{...beer}}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="text" name="beerName" />
                            <Field type="text" name="beerStyle" />
                            <Field type="number" name="beerAbv" />
                            <Field type="number" name="beerIbu" />
                            <Field type="number" name="beerSrm" />
                            <Field type="number" name="beerServeSize" />
                            <Field type="text" name="beerGroup" />
                            <Field type="text" name="beerDescription" />
                            <Field type="text" name="beerOnTap" />
                            <Field type="text" name="beerNonVegan" />
                            <Field type="text" name="beerShortDescription" />
                            <Field type="text" name="beerFlavorNotes" />
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
        </div>
    );
}

export default BeerForm;