import { JSX } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import { 
  useGetUsersQuery, 
  useDeleteUserMutation,
} from '@src/slices/usersApiSlice'

import Loader from '@src/components/Loader'
import Message from '@src/components/Message'

import { IUserKeys } from '@src/types/interfaces'

export default function UserListPage(): JSX.Element {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery(null);


  const [ deleteUser, { isLoading: deleteUserLoading }] = useDeleteUserMutation();

  async function handleDelete(user: IUserKeys) {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await deleteUser(user);
        refetch();
        toast.success(`${user.name} deleted!`);
      } catch (err) {
        toast.error("User Delete Error!"/* || err?.data?.message || err?.message */);
      }
    }
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
        </Col>
      </Row>
      {
        isLoading || deleteUserLoading ? 
          <Loader /> : 
        error ?
          <Message evalBool={false} variant="danger">{`${error}`}</Message> : 
        (
          <>
            <Table striped hover responsive className="table-sm">
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
                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                          <Button variant="light" className="btn-sm mx-2">
                            <FaEdit />
                          </Button>
                        </LinkContainer>
                        <Button 
                          variant="danger" 
                          className="btn-sm"
                          onClick={() => handleDelete(user)}
                          ><FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </>
        )
      }
    </>
  )
}