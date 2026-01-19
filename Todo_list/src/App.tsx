import React from 'react';
import './App.css'


type Item = {
  id: number,
  name: string,
  level: string,
}
type AppProps = {
  inputName: string,
  inputLevel: string,
  editId: number | null,
  editinputName: string,
  editLevel: string,
  keyword: string,
  items: Item[],
  filteredItems: Item[],
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
class App extends React.Component<{}, AppProps> {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  constructor(props: {}) {
    super(props);
    this.state = {
      inputName: "",
      inputLevel: "Small",
      editId: null,
      editinputName: "",
      editLevel: "Small",
      keyword: "",
      items: [],
      filteredItems: [],
    };
  }

    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    componentDidUpdate(prevProps: {}, prevState: AppProps) {
    if (
      prevState.keyword !== this.state.keyword ||
      prevState.items !== this.state.items
    ) {
      const { keyword, items } = this.state;

      if (keyword.trim() === "") {
        this.setState({ filteredItems: items });
      } else {
        const result = items.filter((item) =>
          item.name.toLowerCase().includes(keyword.toLowerCase())
        );
        this.setState({ filteredItems: result });
      }
    }
  }


    addItem = () => {
      const { inputName, inputLevel, items } = this.state;
        if (inputName.trim() === "") return;
        const newItem = {
        id: items.length + 1,
        name: inputName,
        level: inputLevel,
      };
      this.setState({
        items: [...items, newItem],
        inputName: "",
        inputLevel: "Small",
      });
    }

    deleteItem = (id: number) => {
      const { items } = this.state;
      const newItems = items.filter((item) => item.id !== id);
      this.setState({ items: newItems }); 
    }

    editItem = (id: number) => {
      const { items } = this.state;
      const item = items.find((item) => item.id === id);
      if (item) {
        this.setState({
          editId: item.id,
          editinputName: item.name,
          editLevel: item.level,
        });
      }
    }

    saveEdit = () => {
    const { editId, editinputName, editLevel, items } = this.state;
    if (editId === null || editinputName.trim() === "") return;
    const newItems = items.map((item) => { 
      if (item.id === editId) { 
        return {
          ...item, 
          name: editinputName, 
          level: editLevel,
        };
      }
      return item;
    });
    this.setState({
      items: newItems,
      editId: null,
      editinputName: "",
      editLevel: "Small",
    });

  }
  canceform = () => {
    this.setState({
      inputName: "",
      inputLevel: "Small",
    });
  }
    cancleEdit = () => {
      this.setState({
        editId: null,
        editinputName: "",
        editLevel: "Small",
      });
    }
    
  clearSearch = () => {
    this.setState({
      keyword: "",
    });
  }
  

  render() {

    const { editId, editinputName, editLevel, filteredItems } = this.state;
      return (
         <>
          <div className="container mt-4">
            <div className="row mb-3">
              <div className="col-lg-6">
                <div className="d-flex gap-3 align-items-center">
                  <div className="input-group w-50">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      value={this.state.keyword}
                      onChange={(e) => this.setState({ keyword: e.target.value })} // setState({ keyword: e.target.value })(e.target.value)}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary" onClick={this.clearSearch}>Clear</button>
                  </div>
                  <div className="d-flex gap-2">
                    <select className="form-select">
                      <option>Sort by</option>
                      <option value="name">Name</option>
                      <option value="level">Level</option>
                    </select>
                    <button className="btn btn-success" style={{
                      minWidth: '180px'
                    }}>NAME - DESC</button>
                  </div>

                </div>
              </div>
              <div className="col-lg-6" style={{
                
              }}>
                <div className="fw-bold" style={
                  {
                    backgroundColor: 'blue',
                    width: '100%', 
                    height: '35px',
                    borderRadius: '5px 5px 0 0'
                    ,
                    color: 'white',
                    textAlign: 'center',
                    lineHeight: '35px' 
                  }
                }>Add Item</div>
                <div className="d-flex justify-content-end align-items-center gap-2 p-1">
                  
                  <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Item Name"
                    value={this.state.inputName}
                    onChange={(e) => this.setState({ inputName: e.target.value })} // setState({ inputName: e.target.value })(e.target.value)}
                  />

                  <select className="form-select w-25" value={this.state.inputLevel} onChange={(e) => this.setState({ inputLevel: e.target.value })} >
                    <option>Small</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>

                  <button className="btn btn-primary" onClick={this.addItem}>Submit</button>
                  <button className="btn btn-outline-secondary" onClick={this.canceform}>Cancel</button>
                </div>
              </div>
            </div>
            <div className="card border-success">
              <div className="card-header bg-success bg-opacity-25 fw-bold">
                List Item
              </div>
              <div className="card-body p-0">
                <table className="table table-bordered table-hover mb-0 align-middle">
                  <thead className="table-light text-center">
                    <tr>
                      <th>#</th>
                      <th className="text-start">Name</th>
                      <th>Level</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredItems.map((item) => (
                      <tr key={item.id}>
                        <td className="text-center">{item.id}</td>
                        <td className="text-start">
                          {editId === item.id ? (
                            <input
                              type="text"
                              className="form-control"
                              value={editinputName}
                              onChange={(e) => this.setState({ editinputName: e.target.value })} // setState({ editinputName: e.target.value })(e.target.value)}
                            />
                          ) : (
                            item.name
                          )}
                        </td>
                        <td className="text-center">
                          {editId === item.id ? (
                            <select
                              className="form-select"
                              value={editLevel}
                              onChange={(e) => this.setState({ editLevel: e.target.value })} // setState({ editLevel: e.target.value })(e.target.value)}
                            >
                              <option>Small</option>
                              <option>Medium</option>
                              <option>High</option>
                            </select>
                          ) : (
                            item.level
                          )}
                        </td>
                        <td className="text-center">
                        {
                          editId === item.id ? (
                            <>
                              <button className="btn btn-success btn-sm me-1" onClick={this.saveEdit}>Save</button>
                              <button className="btn btn-secondary btn-sm" onClick={this.cancleEdit}>Cancel</button>
                            </>
                          ) : (
                            <>
                              <button className="btn btn-warning btn-sm me-1" onClick={() => this.editItem(item.id)}>Edit</button>
                              <button className="btn btn-danger btn-sm" onClick={() => this.deleteItem(item.id)}>Delete</button>
                            </>
                          )
                        }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )
  }


}

export default App
