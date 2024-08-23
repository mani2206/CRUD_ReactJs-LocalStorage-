import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const GlobalContext = createContext();

const AppContext = (props) => {
  const [userData, setUserData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [selectedEditData, setSelectedEditData] = useState({});
  const [selectedDeleteData, setSelectedDeleteData] = useState({});
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Get Data from Local Storage
  const fetchData = () => {
    const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    setUserData(storedData);
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    phoneNumber2: "",
    phoneNumber3: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    qualification: "",
    comments: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Save Data to Local Storage
  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const updatedData = [...userData, { ...input, id: Date.now().toString() }];
      localStorage.setItem("userData", JSON.stringify(updatedData));
      setUserData(updatedData);
      
      setInput({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        phoneNumber2: "",
        phoneNumber3: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        qualification: "",
        comments: "",
      });

      toast.success("Successfully added");
    } catch (error) {
      console.error("Error while saving data:", error);
      toast.error("Failed to add data. Please try again.");
    }
  };

  // Edit Data in Local Storage
  const handleEditSubmission = (e, data) => {
    e.preventDefault();

    try {
      const updatedData = userData.map((item) =>
        item.id === data.id ? data : item
      );
      localStorage.setItem("userData", JSON.stringify(updatedData));
      setUserData(updatedData);
      
      toast.success("Successfully updated");
      setShowEditModal(false);
    } catch (error) {
      console.error("Error while updating data:", error);
      toast.error("Failed to update data. Please try again.");
    }
  };

  // Delete Data from Local Storage
  const confirmDelete = (id) => {
    try {
      const updatedData = userData.filter((item) => item.id !== id);
      localStorage.setItem("userData", JSON.stringify(updatedData));
      setUserData(updatedData);
      
      toast.success("User has been removed");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error while deleting data:", error);
      toast.error("Failed to delete data. Please try again.");
    }
  };

  // Handle View, Edit, and Delete Modal Logic
  const handleView = (data) => {
    setSelectedData(data);
    setShowViewModal(true);
    document.body.classList.add("modal-open");
  };

  const handleViewClose = () => {
    setShowViewModal(false);
    document.body.classList.remove("modal-open");
  };

  const handleEdit = (data) => {
    setSelectedEditData(data);
    setShowEditModal(true);
    document.body.classList.add("modal-open");
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    document.body.classList.remove("modal-open");
  };

  const handleDeleteModal = (data) => {
    setSelectedDeleteData(data.id);
    setShowDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        userData,
        input,
        handleChange,
        handleSubmit,
        handleEdit,
        handleDeleteModal,
        handleView,
        handleDeleteClose,
        selectedData,
        showViewModal,
        handleViewClose,
        showDeleteModal,
        setShowDeleteModal,
        confirmDelete,
        selectedEditData,
        showEditModal,
        handleEditClose,
        handleEditSubmission,
        selectedDeleteData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
