
const newFormHandler = async (event) => {
    event.preventDefault();
    
    const comment = document.querySelector('#comment').value.trim();
    if (comment) {
        const comment = await fetch('/api/comments',{
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (comment.ok) {
            document.location.reload()
        } else {
            alert('Failed to create comment')
        }
    }

}

document 
.querySelector('.new-comment-form')
.addEventListener('submit', newFormHandler);