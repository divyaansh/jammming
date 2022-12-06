import './TrackList.css';
import Track from '../Track/Track'

function TrackList(props) {
  return (
    <div className="TrackList">
      {console.log(props.tracks)}
      {props.tracks.map(track => 
        (
          <Track 
            track={track}
            key={track.id}
            onAdd={props.onAdd}
            isRemoval={props.isRemoval}
            onRemove={props.onRemove}
          />
        )
      )}
    </div>
  )
}

export default TrackList;