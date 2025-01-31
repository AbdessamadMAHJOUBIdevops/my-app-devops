import React, { useState, useEffect } from "react";
import { getItems, addItem, deleteItem, updateItem } from "../services/api";

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: "", description: "" });
    const [edit, setEdit] = useState(false);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        getItems().then(setItems);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!edit) {
            // Adding new item
            if (newItem.name && newItem.description) {
                addItem(newItem).then((item) => {
                    setItems([...items, item]);
                    setNewItem({ name: "", description: "" }); // Reset form
                });
            }
        } else {
            // Updating existing item
            updateItem(editItem.id, { ...editItem, ...newItem }).then((updatedItem) => {
                const updatedItems = items.map(item => item.id === updatedItem.id ? updatedItem : item);
                setItems(updatedItems);
                setEdit(false);
                setNewItem({ name: "", description: "" }); // Reset form
            });
        }
    };

    const handleDelete = (id) => {
        deleteItem(id).then(() => {
            setItems(items.filter(item => item.id !== id));
        });
    };

    const handleEdit = (item) => {
        setEdit(true);
        setEditItem(item);
        setNewItem({ name: item.name, description: item.description });
    };

    const handleCancel = () => {
        setEdit(false);
        setNewItem({ name: "", description: "" });
    };

    return (
        <div>
            {/* Form for Adding or Updating Items */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">{edit ? 'Edit Item' : 'Add a New Item'}</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter item name"
                                value={newItem.name}
                                onChange={(e) =>
                                    setNewItem({ ...newItem, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                placeholder="Enter item description"
                                value={newItem.description}
                                onChange={(e) =>
                                    setNewItem({ ...newItem, description: e.target.value })
                                }
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">
                            {edit ? 'Update Item' : 'Add Item'}
                        </button>
                        {edit && (
                            <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>
                                Cancel
                            </button>
                        )}
                    </form>
                </div>
            </div>

            {/* List of Items */}
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Items</h5>
                    {items.length > 0 ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(item)}>Edit</button>
                                            <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-muted">No items found. Add some items above.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemList;
