import React, { useEffect } from "react";
import "./styles.css";
import { useState } from "react";
import { fetchUsers, saveUser } from "./utils/api";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .then(() => setLoading(false));
  }, []);

  const handleUserEdit = (value) => {
    const user = users.find((el) => el.id === +value);
    setEditingUser(user);
  };

  const handleUserSubmit = (event) => {
    setLoading(true);
    console.dir(event.target)
    saveUser(editingUser)
      .then(fetchUsers)
      .then(setUsers)
      .then(() => {
        setEditingUser(null);
        setLoading(false);
      });
  };

  const handleFirstNameChange = (firstName) => {
    if (!firstName || firstName.length < 2) {
      setValid(true);
    } else {
      setValid(false);
    };

    setEditingUser({ ...editingUser, firstName });
  };

  const handleLastNameChange = (lastName) => {
    if (!lastName || lastName.length < 2) {
      setValid(true);
    } else {
      setValid(false);
    };
    setEditingUser({ ...editingUser, lastName });
  };

  const handleEmailChange = (email) => {
   if (!email.includes('@') || email.startsWith('@') || email.endsWith('@')) {
      setValid(true);
    } else {
      setValid(false);
    };

    setEditingUser({ ...editingUser, email });
  };

  const handlebPasswordChange = (password) => {
    if (!password || password.length < 6) {
      setValid(true);
    } else {
      setValid(false);
    };

    setEditingUser({ ...editingUser, password });
  };

  const handlebirthDateChange = (birthDate) => {

    if (!birthDate) {
      setValid(true);
    } else {
      setValid(false);
    }

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
    if (!phone.pattern) {
      setValid(true);
    } else {
      setValid(false);
    };

    setEditingUser({ ...editingUser, phone });
  };

  const handlebloodGroupChange = (bloodGroup) => {
    setEditingUser({ ...editingUser, bloodGroup });
  };

  const handleHairColorChange = (color) => {
    if (!color) {
      setValid(true);
    } else {
      setValid(false);
    };

    const updatedUser = {
      ...editingUser,
      hair: {
        ...editingUser.hair,
        color
      },
    };
   
    setEditingUser(updatedUser)
  };

  const handleTypeColorChange = (type) => {

    if (!type) {
      setValid(true);
    } else {
      setValid(false);
    };

    const updatedUser = {
      ...editingUser,
      hair: {
        ...editingUser.hair,
        type
      },
    };
   
    setEditingUser(updatedUser)
  };

  const getBloodGroup = () => {
    return users.reduce((acc, item) => {
      if (acc.includes(item.bloodGroup)) {
        return acc;
      } else {
        return [...acc, item.bloodGroup];
      }
    }, [])
      .map((item, key) => {
        return <option key={key} value={item}>{item}</option>
      });
  };

  const getColorOfHair = () => {

    return users.reduce((acc, item) => {
      if (acc.includes(item.hair.color)) {
        return acc;
      } else {
        return [...acc, item.hair.color];
      };
    }, [])
      .map((item, key) => {
        return <option key={key} value={item} />
      });
  };

  const getTypeOfHair = () => {

    return users.reduce((acc, item) => {
      if (acc.includes(item.hair.type)) {
        return acc;
      } else {
        return [...acc, item.hair.type];
      };
    }, [])
      .map((item, key) => {
        return <option key={key} value={item} />
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {editingUser && (
        <div className="wrapper">
          <div className="form">
            <h1 className="form-title">User Editor</h1>
            <form className="row g-3 invalid-form" onSubmit={handleUserEdit}>
              <div className="col-md-6">
                <label className="form-label" htmlFor="firstName">
                  Firts Name*
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  className="form-control validate"
                  value={editingUser.firstName}
                  onChange={(e) => handleFirstNameChange(e.target.value)}
                  minLength="2"
                  title="Enter first name"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className='form-label' htmlFor="lastName">
                  Last Name*
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  className="form-control validate"
                  value={editingUser.lastName}
                  onChange={(e) => handleLastNameChange(e.target.value)}
                  minLength="2"
                  title="Enter last name"
                  required
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
                  className="form-control validate"
                  value={editingUser.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  title="Enter email"
                  required
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
                  className="form-control validate"
                  value={editingUser.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  pattern="(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?"
                  title="Enter phone number"
                  required
                />
              </div>

              <div className="col-4">
                <label className="form-label password" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="form-control validate"
                  value={editingUser.password}
                  onChange={(e) => handlebPasswordChange(e.target.value)}
                  minLength="6"
                  title="Enter password"
                  required
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
                  className="form-control validate"
                  value={editingUser.birthDate}
                  onChange={(e) => handlebirthDateChange(e.target.value)}
                  title="Enter date of birth"
                  required
                />
              </div>

              <div className="col-md-3 form-check-reverse">
                <label className="form-label" htmlFor="updateAge">
                  Update age?
                </label>
                <input
                  id="updateAge"
                  type="checkbox"
                  className="form-check-input"
                  onChange={(e) => handleUpdateAge(e.target.value)}
                  required
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
                      required
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
                      required
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
                      required
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
                  className="form-control validate" 
                  name="color"
                  id="color"
                  value={editingUser?.hair?.color || ''}
                  onChange={(e) => handleHairColorChange(e.target.value)}
                  title="Choose hair color"
                  required
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
                  className="form-control validate" 
                  name="type" 
                  id="type"
                  value={editingUser?.hair?.type || ''}
                  onChange={(e) => handleTypeColorChange(e.target.value)}
                  title="Choose hair type"
                  required
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
                  className="form-select validate"
                  value={editingUser.bloodGroup}
                  onChange={(e) => handlebloodGroupChange(e.target.value)}
                  title="Choose a blood type"
                  required
                >
                  {getBloodGroup()}
                </select>
              </div>

              <div className="form__buttons">
                <button
                  className="btn btn-primary btn-invalid"
                  type="submit"
                  onClick={handleUserSubmit}
                  disabled={valid}
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
            </form>
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

export default App;