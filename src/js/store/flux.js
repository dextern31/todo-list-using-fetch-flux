const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			toDos: [],
			inputValue: "",
			url : "https://playground.4geeks.com/apis/fake/todos/user/dextern31",
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},			
			getTodosAPI: (reqst) => {
				let store = getStore();

				function headerSwitch() {
					if(reqst == "Get") {
						return fetch(store.url, {
							method: reqst,
							headers: {
								"Content-Type": "application/json",
							},
							
		 
						})
					} else {
						return fetch(store.url, {
							method: "Put",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(store.toDos)
						})
					}
				}

				headerSwitch()
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					//console.log(resp.text()); // will try return the exact result as string
					return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
				})
				.then(data => {
					//here is where your code should start after the fetch finishes
				   
					if(reqst == "Get") {
						setStore({toDos: data});
					}
					        
					//console.log(data); //this will print on the console the exact object received from the server
					//return data;
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			updateTodosAPI: () => {
				const store = getStore();
				//console.log(store.toDos.length)
				fetch(store.url, {
					method: "Put",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(store.toDos)
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					//console.log(resp.text()); // will try return the exact result as string
					return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
				})
				.then(data => {
			
				})
				.catch(error => {
					//error handling
					console.log(error);
				})
			},
			change: (e) => {
				setStore({inputValue: e.target.value});
			},
			addToList: (e) => {
				const store = getStore();

				if (e.key === 'Enter' && store.inputValue.trim() !== "") {
					let newList = store.toDos.concat({done: false, id: store.toDos.length+1, label: store.inputValue});
					setStore({toDos: newList});
					setStore({inputValue: ""});
					getActions().getTodosAPI("Put");
					//console.log(newList);
				}
			},
			itemsLeft: (list) => {
				if(list.length==0) {
					return ("No tasks, add a task");
				}
				if(list.length==1){
					return ("1 item left");
				}
				return (`${list.length} items left`);
			},
			delTask : (list, index) => {
				let delList = list.filter((item, currentIndex) => index != currentIndex);
        		let newList = delList.map((item, index) =>  {
            		return {...item, id: index+1};
        		});
        		setStore({toDos:newList});
				getActions().getTodosAPI("Put");
        		//console.log(newList);
			}
		}
	};
};

export default getState;
