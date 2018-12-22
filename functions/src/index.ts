import * as functions from 'firebase-functions';

export const onEventAdded = functions.database
.ref("/state/events/{event}")
.onCreate(snapshot => {
    const ref = snapshot.ref.parent.parent
    const points = snapshot.child("points").val()
    snapshot.child("players").val().map(childsnap => {
        const playerref = ref.child("playerpoints").child(childsnap).child("points")
        playerref.transaction(count => {
        return count + points
        }).catch(error => console.log(error))
    })
  return null
})
export const onEventRemoved = functions.database
.ref("/state/events/{event}")
.onDelete(snapshot => {
    const ref = snapshot.ref.parent.parent
    const points = snapshot.child("points").val()
    snapshot.child("players").val().map(childsnap => {
        const playerref = ref.child("playerpoints").child(childsnap).child("points")
        playerref.transaction(count => {
        return count - points
        }).catch(error => console.log(error))
    })
  return null
})