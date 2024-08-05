import { JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import './UserListPage.css'

import { 
  useGetUsersQuery, 
  useDeleteUserMutation,
} from '@src/slices/usersApiSlice'

import Loader from '@src/components/Loader'
import Message from '@src/components/Message'

import Background from '@src/components/Background/Background'

import { IUserKeys } from '@src/types/interfaces'

export default function UserListPage(): JSX.Element {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery(null);

  const [ deleteUser, { isLoading: deleteUserLoading }] = useDeleteUserMutation();

  const navigate = useNavigate();

  async function handleDelete(user: IUserKeys) {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      let message = "";
      try {
        const res = await deleteUser({ data: user, id: user._id });
        if (res?.error) {
          const dataObj = res?.error as { data: { message: string, stack: string }}
          message = dataObj.data.message as string;
          toast.error(message);
        } else {
          toast.success(`${user.name} deleted!`);
        }
        refetch();
      } catch (err) {
        toast.error(message);
      }
    }
  }

  return (
    <section className="user-list-container">
      <Background variant="museum" whiteBackground={true} />
      <section className="user-list-title">
        <h1>Users</h1>
      </section>
      {
        isLoading || deleteUserLoading ? 
          <Loader /> : 
        error ?
          <Message evalBool={false} variant="danger">{`${error}`}</Message> : 
        (
          <>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { 
                  users.map((user: IUserKeys) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? 
                        <FaCheck style={{color: "green"}} /> : 
                        <FaTimes style={{color: "red"}} />}
                      </td>
                      <td>
                        <button 
                          className="edit-button" 
                          onClick={() => navigate(`/admin/user/${user._id}/edit`)}
                        ><FaEdit />
                        </button>
                        <button 
                          className="trash-button"
                          onClick={() => handleDelete(user)}
                          ><FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </>
        )
      }
    </section>
  )
}