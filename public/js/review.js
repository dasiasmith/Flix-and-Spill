// const { response } = require("express");

const newFormHandler = async (event) => {
    event.preventDefault();
    
    const review_text = document.querySelector('#review-text').value.trim();
    if (review_text) {
        const response = await fetch('/api/reviews',{
            method: 'POST',
            body: JSON.stringify({ review_text }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Failed to create review')
        }
    }

}

document 
.querySelector('.new-review-form')
.addEventListener('submit', newFormHandler);