import { JSX, FormEvent, useState, useEffect, useId } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import './UserEditPage.css'

import { 
  useGetUserByIdQuery, 
  useUpdateUserMutation, 
} from '@src/slices/usersApiSlice'

import Loader from '@src/components/Loader'
import Message from '@src/components/Message'
import FormContainer from '@src/components/FormContainer/FormContainer'

import Background from '@src/components/Background/Background'

export default function UserEditPage(): JSX.Element {
  const { id: paramId } = useParams();
  const id = useId();

  const [ name, setName ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ isAdmin, setIsAdmin ] = useState<boolean>(false);

  const { data, isLoading: userLoading, error: userError } = useGetUserByIdQuery(paramId);

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
      id: paramId,
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
    <section className="user-edit-page-container">
      <Background variant="museum" whiteBackground={true} />
      <button className="back-button" onClick={() => navigate('/admin/userlist')} >
        Go Back
      </button>
      <FormContainer>
        <section className="edit-user-styling">
          <h1>Edit User</h1>
          {
            updateLoading && <Loader />
          }
          {
            userLoading ? 
            <Loader /> : 
            userError ?
            <Message evalBool={false} variant="danger">{`${userError}`}</Message> : (
              <form>
                <div>
                  <label htmlFor={id + "-name"}>Name</label>
                  <input
                    name="name"
                    id={id + "-name"}
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  >
                  </input>
                </div>

                <div>
                  <label htmlFor={id + "-email"}>Email</label>
                  <input
                    name="email"
                    id={id + "-email"}
                    type="email"
                    placeholder="Enter price"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  >
                  </input>
                </div>
                  
                <div>
                  <div>
                    <input
                      name="isAdmin"
                      id={id + "-administrator"}
                      type="checkbox"
                      checked={isAdmin}
                      onChange={(event) => setIsAdmin(event.target.checked)}
                    >
                    </input>
                    <label htmlFor={id + "-administrator"}>Administrator</label>
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="update-button"
                  onClick={(event) => handleSubmit(event)}
                >Update
                </button>

              </form>
            )
          } 
        </section>
      </FormContainer>
    </section>
  )
}