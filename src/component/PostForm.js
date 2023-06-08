import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';

const PostForm = () => {
  const [allPost, setAllPost] = useState([]);

  const getAllPosts = async () => {
    await axios
      .get('http://localhost:3003/getallpost')
      .then((response) => {
        if (response.status === 200) {
          setAllPost(response?.data);
        }
      })
      .catch((err) => console.log(err, 'eeee'));
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      postHeading: '',
      description: '',
    },
    onSubmit: async (values) => {
      await axios
        .post('http://localhost:3003/addpost', values)
        .then((response) => {
          if (response.status === 200) {
            console.log('success');
            formik.setFieldValue('fullName', '');
            formik.setFieldValue('postHeading', '');
            formik.setFieldValue('description', '');
          }
          return response;
        })
        .catch((err) => console.log(err, 'eeee'));
      getAllPosts();
    },
  });

  return (
    <div className="mt-5">
      <Row>
        <Col>
          <h3>Create Blog Post</h3>
        </Col>
      </Row>
      <Form className=" w-25 m-auto">
        <Row className="d-flex flex-column">
          <Col className="mb-3">
            <Form.Group controlId="fullName">
              <Form.Label className="float-start">Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Full Name"
                {...formik.getFieldProps('fullName')}
              />
            </Form.Group>
          </Col>
          <Col className="mb-3">
            <Form.Group controlId="postHeading">
              <Form.Label className="float-start">Post Heading</Form.Label>
              <Form.Control
                type="text"
                placeholder="Heading"
                {...formik.getFieldProps('postHeading')}
              />
            </Form.Group>
          </Col>
          <Col className="mb-3">
            <Form.Group controlId="description">
              <Form.Label className="float-start">Post Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description..."
                {...formik.getFieldProps('description')}
              />
            </Form.Group>
          </Col>
          <Col className="mb-3">
            <Button
              onClick={() => formik.handleSubmit()}
              className="active:bg-success"
            >
              Post
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="mt-5 w-50 m-auto">
        <Table bordered hover className="text-center">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Heading</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {allPost?.length > 0 &&
              allPost.map((post) => (
                <tr key={post?._id}>
                  <td>{post?.fullName}</td>
                  <td>{post?.postHeading}</td>
                  <td>{post?.description}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </div>
  );
};

export default PostForm;
