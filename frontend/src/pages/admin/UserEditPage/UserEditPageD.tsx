import { JSX, FormEvent, useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { 
  useGetUserByIdQuery, 
  useUpdateUserMutation, 
} from '@src/slices/usersApiSlice'

import Loader from '@src/components/Loader'
import Message from '@src/components/Message'
import FormContainer from '@src/components/FormContainer/FormContainer'

import Background from '@src/components/Background/Background'

export default function UserEditPage(): JSX.Element {
  const { id } = useParams();

  const [ name, setName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ isAdmin, setIsAdmin ] = useState<boolean>(false);

  const { data, isLoading: userLoading, error: userError } = useGetUserByIdQuery(id);

  const [ updateUser, { isLoading: updateLoading } ] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setEmail(data.email || "");
      setIsAdmin(data.isAdmin || false);
    }
  }, [data]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const updatedUser = {
      id,
      name,
      email,
      isAdmin,
    }
    let message = "";
    try {
      const res = await updateUser(updatedUser);
      if (res?.error) {
        const dataObj = res?.error as { data: { message: string, stack: string }}
        message = dataObj.data.message as string;
        toast.error(message);
      } else {
        toast.success("User updated successfully!");
      }
      navigate("/admin/userlist");
    } catch(err) {
      if (err instanceof Error && "data" in err) {
        const output = err?.data as { message: string }
        message = output.message;
      }
      toast.error(message);
    }
  }

  return (
    <>
      <Background variant="museum" whiteBackground={true} />
      <Link to='/admin/userlist' className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <>
          <h1>Edit User</h1>
          {
            updateLoading && <Loader />
          }
          {
            userLoading ? 
              <Loader /> : 
              userError ?
              <Message evalBool={false} variant="danger">{`${userError}`}</Message> : (
                <Form>
                  <Form.Group controlId="name" className="my-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    >
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="email" className="my-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Enter price"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    >
                    </Form.Control>
                  </Form.Group>
                  
                  <Form.Group controlId="admin" className="my-2">
                    <Form.Check
                      type="checkbox"
                      label="isAdmin"
                      checked={isAdmin}
                      onChange={(event) => setIsAdmin(event.target.checked)}
                    >
                    </Form.Check>
                  </Form.Group>
                 
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="my-2"
                    onClick={(event) => handleSubmit(event)}
                  >Update
                  </Button>

                </Form>
              )
          } 
        </>
      </FormContainer>
    </>
  )
}