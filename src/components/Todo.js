import React, { Component } from 'react';
import Items from './Items';
import Counter from './Counter';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      items: []
    };
  }

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('todo-app'));
    if (items) this.setState({ items });
  }

  componentDidUpdate() {
    const items = this.state.items;
    localStorage.setItem('todo-app', JSON.stringify(items));
  }


  

  handleChange = (event) => {
    this.setState({
      newItem: event.target.value
    });
  };

  handleSubmit = (event) => {
    // prevent default - no page reload
    event.preventDefault();
    // set the new item to add to array
    const newItem = {
      id: Date.now(),
      text: this.state.newItem.trim(),
      status: false
    };

    if (newItem.text !== '')
      // update the array in the state
      this.setState(prevState => ({
        //items: prevState.items.concat(newItem),
        items: [...prevState.items, newItem],
        newItem: ''
      }));
  };

  handleStatus = (id) => {
    console.log(`Status Changing ${id}`);
    const items = this.state.items.map(item => {
      if (item.id === id) {
        item.status = !item.status;
        return item;
      } else return item;
    });
    this.setState({ items });
  };

  handleDelete = (id) => {
    console.log(`Deleting item ${id}`)

    const items = this.state.items.filter(
      item => item.id !== id 
    );

    this.setState({items})

    }
  

  
  render() {
    return (
      <div>
        <Items onStatus={this.handleStatus}
                onDelete={this.handleDelete} 
                items={this.state.items} />

        <Counter items={this.state.items}/>
        
        <form onSubmit={this.handleSubmit}>
          <input
            className="form-control mb-4"
            placeholder="Add a new task"
            onChange={this.handleChange}
            type="text"
            id="todo-item"
            value={this.state.newItem}
          ></input>
          <button className="btn btn-primary">Add</button>
        </form>
      </div>
    );
  }
}
