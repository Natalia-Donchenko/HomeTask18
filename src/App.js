import React, { useEffect } from "react";
// import { data } from './users-data';
import "./styles.css";
import { useState } from "react";

import { fetchUsers, saveUser } from "./utils/api";

function App() {
  // const userData = deepClone(data.users);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log("users", users);
  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .then(() => setLoading(false));
  }, []);

  const handleUserEdit = (value) => {
    const user = users.find((el) => el.id === +value);
    setEditingUser(user);
  };

  const handleUserSubmit = () => {
    setLoading(true);

    saveUser(editingUser)
      .then(fetchUsers)
      .then(setUsers)
      .then(() => {
        setEditingUser(null);
        setLoading(false);
      });

    // const editingUserIndex = users.findIndex(user => user.id === editingUser.id);
    // const updatedUsers = [...users];

    // updatedUsers[editingUserIndex]=editingUser;
    // setUsers(updatedUsers);
    // setEditingUser(null)
  };

  const handleFirstNameChange = (firstName) => {
    setEditingUser({ ...editingUser, firstName });
  };

  const handleLastNameChange = (lastName) => {
    setEditingUser({ ...editingUser, lastName });
  };

  const handleEmailChange = (email) => {
    setEditingUser({ ...editingUser, email });
  };

  const handlebPasswordChange = (password) => {
    setEditingUser({ ...editingUser, password });
  };

  // const handleAgeChange = (age) => {
  //   setEditingUser({ ...editingUser, age });
  // };

  const handlebirthDateChange = (birthDate) => {
    setEditingUser({ ...editingUser, birthDate });
  };
  
  const handleUpdateAge = () => {
    const userBithday = Date.parse(editingUser.birthDate);
    const today = Date.now();
    editingUser.age = Math.floor((today - userBithday) / 31536000000);
  };

  const handleGenderChange = (gender) => {
    setEditingUser({ ...editingUser, gender });
  };

  const handlePhoneChange = (phone) => {
    setEditingUser({ ...editingUser, phone });
  };

  const handlebloodGroupChange = (bloodGroup) => {
    setEditingUser({ ...editingUser, bloodGroup });
  };

  const handleHairColorChange = (color) => {
    const updatedUser = {
      ...editingUser,
      hair: {
        ...editingUser.hair,
        color
      },
    }
   
    setEditingUser(updatedUser)
  };

  const handleTypeColorChange = (type) => {
    const updatedUser = {
      ...editingUser,
      hair: {
        ...editingUser.hair,
        type
      },
    }
   
    setEditingUser(updatedUser)
  };

  const getColorOfHair = () => {

    return users.reduce((acc, item) => {
      if (acc.includes(item.hair.color)) {
        return acc
      } else {
        return [...acc, item.hair.color]
      }
    }, [])
      .map((item, key) => {
        return <option key={key} value={item} />
      })
  }

  const getTypeOfHair = () => {

    return users.reduce((acc, item) => {
      if (acc.includes(item.hair.type)) {
        return acc
      } else {
        return [...acc, item.hair.type]
      }
    }, [])
      .map((item, key) => {
        return <option key={key} value={item} />
      })
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {editingUser && (
        <div className="wrapper">
          <div className="form">
            <h1 className="form-title">User Editor</h1>
            <form className="row g-3" onSubmit={handleUserEdit}>
              <div className="col-md-6">
                <label className="form-label" htmlFor="firstName">
                  Firts Name*
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={editingUser.firstName}
                  onChange={(e) => handleFirstNameChange(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="lastName">
                  Last Name*
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={editingUser.lastName}
                  onChange={(e) => handleLastNameChange(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control"
                  value={editingUser.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={editingUser.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                />
              </div>
              <div className="col-4">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="form-control"
                  value={editingUser.password}
                  onChange={(e) => handlebPasswordChange(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="birthDate">
                  Birth Date
                </label>
                <input
                  id="birthDate"
                  type="date"
                  name="birthDate"
                  className="form-control"
                  value={editingUser.birthDate}
                  onChange={(e) => handlebirthDateChange(e.target.value)}
                />
              </div>
              {/* <div className="col-md-2">
                <label className="form-label" htmlFor="age">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  className="form-control"
                  value={editingUser.age}
                  onChange={(e) => handleAgeChange(e.target.value)}
                />
              </div> */}
              <div className="col-md-3 form-check-reverse">
                <label className="form-label" htmlFor="updateAge">
                  Update age?
                </label>
                <input
                  id="updateAge"
                  type="checkbox"
                  className="form-check-input"
                  onChange={(e) => handleUpdateAge(e.target.value)}
                />
              </div>



              <div className="col-md-12 hstack gap-3">
                <span className="form-label" htmlFor="gender">
                  Gender
                </span>
                <div className="form-check form-check-inline">
                  <label className="form-label">
                    <input
                      type="radio"
                      name="gender"
                      className="form-check-input"
                      value="male"
                      onChange={(e) => handleGenderChange(e.target.value)}
                      checked={editingUser.gender === "male"}
                    />
                    male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-label">
                    <input
                      type="radio"
                      name="gender"
                      className="form-check-input"
                      value="female"
                      onChange={(e) => handleGenderChange(e.target.value)}
                      checked={editingUser.gender === "female"}
                    />
                    female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <label className="form-label">
                    <input
                      type="radio"
                      name="gender"
                      className="form-check-input"
                      value="unset"
                      onChange={(e) => handleGenderChange(e.target.value)}
                      checked={editingUser.gender === "unset"}
                    />
                    prefer not to respond (unset)
                  </label>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label" htmlFor="colorOfHair">
                  Color of Hair
                </label>
                <input 
                  list="colorOfHair" 
                  className="form-control" 
                  name='color' 
                  id="color"
                  value={editingUser?.hair?.color || ''}
                  onChange={(e) => handleHairColorChange(e.target.value)}
                />
                <datalist id="colorOfHair"> 
                  {getColorOfHair()}
                </datalist>
              </div>

              <div className="col-md-6">
                <label className="form-label" htmlFor="colorOfHair">
                  Type of Hair
                </label>
                <input 
                  list="typeOfHair" 
                  className="form-control" 
                  name='type' 
                  id="type"
                  value={editingUser?.hair?.type || ''}
                  onChange={(e) => handleTypeColorChange(e.target.value)}
                />
                <datalist id="typeOfHair"> 
                  {getTypeOfHair()}
                </datalist>
              </div>

              <div className="col-md-6">
                <label className="form-label" htmlFor="bloodGroup">
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  name="blood_group"
                  className="form-select"
                  value={editingUser.bloodGroup}
                  onChange={(e) => handlebloodGroupChange(e.target.value)}
                >
                  <option value="">{editingUser.bloodGroup}</option>
                  <option value="A+">A RhD positive (A+)</option>
                  <option value="A-">A RhD negative (A-)</option>
                  <option value="B+">B RhD positive (B+)</option>
                  <option value="B-">B RhD negative (B-)</option>
                  <option value="0+">O RhD positive (O+)</option>
                  <option value="0-">O RhD negative (O-)</option>
                  <option value="AB+">AB RhD positive (AB+)</option>
                  <option value="AB-">AB RhD negative (AB-)</option>
                </select>
              </div>
            </form>

            <div className="form__buttons">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleUserSubmit}
              >
                Submit
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() => setEditingUser(null)}
              >
                Cansel
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Age</th>
            <th>BirthDate</th>
            <th>Phone Number</th>
            <th>Blood Group</th>
            <th>Color of Hair</th>
            <th>Type of Hair</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.gender}</td>
              <td>{user.age}</td>
              <td>{user.birthDate}</td>
              <td>{user.phone}</td>
              <td>{user.bloodGroup}</td>
              <td>{user.hair.color}</td>
              <td>{user.hair.type}</td>
              <td>
                <button
                  id={user.id}
                  className="btn btn-light"
                  onClick={() => {
                    setEditingUser(user);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// const deepClone = (originalObj) => {
//   if (!originalObj || typeof originalObj !== "object")  {
//     return originalObj;
//   }

//   const clonedObj = Array.isArray(originalObj) ? [] : {};

//   for (const key in originalObj) {
//     const value = originalObj[key];

//     clonedObj[key] = deepClone(value);
//   }

//   return clonedObj;
// };

export default App;
