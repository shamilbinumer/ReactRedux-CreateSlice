import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, editUser, deleteUser, selectUsers } from './Redux/UserSlice';
import { addProduct, deleteProduct, selectProducts } from './Redux/ProductSlice';
import { addImage, deleteImage, selectImages } from './Redux/ImageSlice';
import './App.css';

function App() {
  const users = useSelector(selectUsers);
  const products = useSelector(selectProducts);
  const images = useSelector(selectImages);
  const dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userImage, setUserImage] = useState(null);

  const handleAddProduct = () => {
    if (productName && productPrice && productImage) {
      const productData = { id: Date.now(), name: productName, price: productPrice, image: productImage };
      dispatch(addProduct(productData));
      setProductName('');
      setProductPrice('');
      setProductImage(null);
    } else {
      alert('Please enter product name, price, and upload an image.');
    }
  };

  const handleAddUser = () => {
    if (userName && userAge && userImage) {
      dispatch(addUser({ id: Date.now(), name: userName, age: userAge, image: userImage }));
      setUserName('');
      setUserAge('');
      setUserImage(null);
    } else {
      alert('Please enter user name, age, and upload an image.');
    }
  };

  const handleEditUser = (id, currentName, currentAge) => {
    const newName = prompt("Enter new name:", currentName);
    const newAge = prompt("Enter new age:", currentAge);

    if (newName !== null && newAge !== null) {
      dispatch(editUser({ id, name: newName, age: newAge, image: userImage }));
    }
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleUserImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUserImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProductImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <div className="left">
        <div className="card">
          <h2>User Details:</h2>
          <div className="form-container">
            <input type="text" placeholder="Name" value={userName} onChange={e => setUserName(e.target.value)} />
            <input type="text" placeholder="Age" value={userAge} onChange={e => setUserAge(e.target.value)} />
            <input type="file" accept="image/*" onChange={handleUserImageChange} />
            <button onClick={handleAddUser}>Add User</button>
          </div>
        </div>
        <div className="details">
          <h2>User List:</h2>
          <ul className="user-list">
            {users.map(user => (
              <li key={user.id}>
                <p>Name: {user.name}</p>
                <p>Age: {user.age}</p>
                <img src={user.image} alt={user.name} />
                <div className="form-container">
                  <button onClick={() => handleEditUser(user.id, user.name, user.age)}>Update</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="right">
        <div className="form-container">
          <div className="card">
            <h2>Add Product:</h2>
            <input type="text" placeholder="Name" value={productName} onChange={e => setProductName(e.target.value)} />
            <input type="text" placeholder="Price" value={productPrice} onChange={e => setProductPrice(e.target.value)} />
            <input type="file" accept="image/*" onChange={handleProductImageChange} />
            <button onClick={handleAddProduct}>Add Product</button>
          </div>
        </div>
        <div className="details">
          <h2>Product List:</h2>
          <ul className="product-list">
            {products.map(product => (
              <li key={product.id}>
                <p>Name: {product.name}</p>
                <p>Price: {product.price}</p>
                <img src={product.image} alt={product.name} />
                <div className="form-container">
                  <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
