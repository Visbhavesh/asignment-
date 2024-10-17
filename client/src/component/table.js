import React, { useState, useEffect } from 'react';

const Table = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://localhost:8000/getUser", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleCut = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    console.log(`User with id: ${id} has been cut`);
  };

  const handleEdit = (id) => {
    console.log(`Edit user with id: ${id}`);
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex justify-center items-center mt-10 bg-white p-5">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Serial No</th>
            <th className="border border-gray-300 px-4 py-2">Profile Picture</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Date of Birth</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={"https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"}
                  alt={`${user.username}'s avatar`}
                  className="w-10 h-10 rounded-full"
                />
                {/* <img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"></img> */}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{formatDate(user.dateOfBirth)}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email || 'Viewer'}</td>
              <td className="border border-gray-300 px-4 py-2">{user.status || 'Active'}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button
                  onClick={() => handleCut(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded">
                  Cut
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
