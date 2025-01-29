import React, {createRef, useEffect, useState} from "react";
//include images into your bundle


const inicialTask = {
	label:"",
	is_done: false
}

const urlBase = "https://playground.4geeks.com/todo"

//create your first component
const Home = () => {
    const [task, settask] = useState(inicialTask)
	const [taskList, setTaksList] = useState ([])

    // function that add to white in the input y push in the useState (task)
    const handleChange = ({target}) => {
          settask ({
			   ...task,
			   [target.name]: target.value
		  })
	}

    const getAllTask = async () => {
		try{
             const respond = await fetch(`${urlBase}/users/roberto`)
			 const data = await respond.json()
			 if (respond.ok) {
                    setTaksList(data.todos)
					 } else {
					createNewUser()
					 }	
					
			}   catch {error} {
			console.log(error)
		}
	}
			 
    //function to creater user
	const createNewUser = async () => {
          try {
         const respond  = await fetch(`${urlBase}/users/roberto`,{
			method:"POST"
		 })
		 //const data = await respond.json()
		  } catch(error) {
			console.log(error)
		  }
	}
	
	// function to create new task 
	const addTask = async (event) => {
		
		if (event.key == "Enter"){
		try{
              const respond = await  fetch (`${urlBase}/todos/roberto`,{
				method: "POST",
				headers:{
					"Content-Type": "application/json"
				}, 
				body: JSON.stringify(task) 
			  })
			  if(respond.ok){
				getAllTask()
			  }
		}	catch (error){
            console.log(error)
		}
		}
	}
    

    const deleteTask = async (id) => {
        try {
			const respond = await fetch(`${urlBase}/todos/${id}`, {
                method: "DELETE"
			})
			if(respond.ok){
				getAllTask()
			  }

		} catch(error) {
			console.log(error)
		}

	}

	useEffect (()=> {
		      getAllTask()
	})

	return (
		
		<div className="container text-center">
			   
			 
			<div className="text-center row">
				<div className="text-center col-12 col-md-7">
			      <h1 className="">List of tasks.</h1>
				  <form onSubmit={(event) => event.preventDefault()}>
					<input
					type="text"
					placeholder="Add a new task"
					className="form-control"
					name="label"
					value={task.label}
					onChange={handleChange}
					onKeyDown={addTask}

					/>
				  </form>

				  {
                    taskList.length <= 0 ? <div> no tiene tareas</div>:       

					     taskList.map((item) => (
						    <div key={item.id} className="class">
							      {item.label}
							 <span><button onClick= { ( ) => deleteTask (item.id) } > &#10060; </button>
							 
							 </span>
						    </div>
						))
				  }
				
			   
			      
				</div>
			</div>
		</div>
	);
};

export default Home;


