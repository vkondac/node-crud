const update = document.querySelector('#update-button');
const deleteButton = document.querySelector('#delete-button');
const notification = document.querySelector('#notification');

update.addEventListener('click', _ => {
    fetch('/tasks', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'SOBA',
        description: 'SPREMI SOBU'
      })
    })
    notification.innerHTML = "First quote changed successfully"

  })


 
  deleteButton.addEventListener('click', _ => {
      fetch('/tasks', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'OVO',
        })
      })
      notification.innerHTML = "Deleted successfully"
  
    })
  
  
  