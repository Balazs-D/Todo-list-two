import React from 'react'

export default function Counter(props) {

            const allTask = Object.keys(props.items).length

            const  completeTask = props.items.filter(item => item.status === true).length
    return (
      <div className="">
        Task completed{' '}
        <p className="badge badge-success counter-nr mb-2">{completeTask}</p> of{' '}
        <p className="badge badge-danger counter-nr mb-2">{allTask}</p>
      </div>
    );
}
