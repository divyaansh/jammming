import './Track.css';

function Track(props) {
  function renderAction () {
    console.log(JSON.stringify(props.track))
    if (props.isRemoval) {
      return <button className="Track-action" onClick={removeTrack}>-</button>
    } else {
      return <button className="Track-action" onClick={addTrack}>+</button>
    }
  }

  function addTrack() {
    console.log(JSON.stringify(props.track))
    props.onAdd(props.track)
  }

  function removeTrack() {
    console.log(JSON.stringify(props.track))
    props.onRemove(props.track)
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.name}</h3>
        <p>{props.track.artist} | {props.track.album}</p>
      </div>
      {renderAction()}
    </div>
  )
}

export default Track;