import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const List = () => {

	var defaultList = [
		{ itemName: 'item 1', quantity: 1, isSelected: false },
		{ itemName: 'item 2', quantity: 3, isSelected: false },
		{ itemName: 'item 3', quantity: 2, isSelected: false },
	];
	// HINT: each "item" in our list names a name,
	// a boolean to tell if its been completed, and a quantity
	const [items, setItems] = useState( () => {
			const saved = localStorage.getItem("items");
			const initialValue = JSON.parse(saved);
			console.log(initialValue)
			return initialValue || defaultList;
		}
	);

	const [inputValue, setInputValue] = useState('');
	const [totalItemCount, setTotalItemCount] = useState(6);

	useEffect(() => {
		calculateTotal();
		window.localStorage.clear()
		window.localStorage.setItem("items", JSON.stringify(items));
	});

	const handleKeyDown = (e) => {
    if (e.key === 'Enter') { 
       handleAddButtonClick()
		}
	};

	const handleAddButtonClick = () => {

		setInputValue('');
		//adds if only value is not empty
		if (inputValue.trim().length !== 0) {
			for (var item of items) {
				if (inputValue === item.itemName) {
					alert("Item already exits")
					return;
				}
			}
			const newItem = {
				itemName: inputValue,
				quantity: 1,
				isSelected: false,
			};

			setItems(items => [newItem, ...items]);
		}
	};

	const handleQuantityIncrease = (index) => {
		const newItems = [...items];

		newItems[index].quantity++;

		setItems(newItems);
	};

	const handleQuantityDecrease = (index) => {
		const newItems = [...items];

		//delete an element if the quantity is -1
		if (newItems[index].quantity - 1 === -1){
			console.log("-1")
			newItems.splice(index, 1)
		} else {
			newItems[index].quantity--;
		}
		setItems(newItems);
	};

	const toggleComplete = (index) => {
		const newItems = [...items];
		const newItem = newItems[index];
		newItem.isSelected = !newItem.isSelected;
		newItems.splice(index, 1)
		if (newItem.isSelected === true) {
			setItems([...newItems, newItem]);
		} else {
			setItems([newItem, ...newItems]);
		}

	};

	const calculateTotal = async () => {
		
		const totalItemCount = items.reduce((total, item) => {
			return total + item.quantity;
		}, 0);

		setTotalItemCount(totalItemCount);
	};

	return (
		<div className='main-container'>
			<div className='add-item-box'>
				<input value={inputValue} onKeyDown={(e) => {setInputValue(e.target.value); handleKeyDown(e)}} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...' />
				<FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
			</div>
			<div className='item-list'>
				{items ? items.map((item, index) => (
					<div className='item-container' key={item.itemName}>
						<div className='item-name' onClick={() => toggleComplete(index)}>
							{item.isSelected ? (
								<>
									<FontAwesomeIcon icon={faCheckCircle} />
									<span className='completed'>{item.itemName}</span>
								</>
							) : (
								<>
									<FontAwesomeIcon icon={faCircle} />
									<span>{item.itemName}</span>
								</>
							)}
						</div>
						<div className='quantity'>
							<button>
								<FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
							</button>
							<span> {item.quantity} </span>
							<button>
								<FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
							</button>
						</div>
					</div>
				)) : ""}
			</div>
			<div className='total'>Total: {totalItemCount}</div>
		</div>
	);
};

export default List;
