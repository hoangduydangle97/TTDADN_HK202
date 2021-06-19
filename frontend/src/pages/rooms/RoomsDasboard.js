import React from 'react';
import { RoomService } from 'services/rooms.service';
import Room from 'components/Rooms/Room';
import { useHistory } from 'react-router-dom';
import { Routes } from 'routes';

export function RoomsDashboard() {
  const history = useHistory();
  let [rooms, setRooms] = React.useState([]);

  React.useEffect(() => {
    RoomService.getAll().then((res) => {
      setRooms(res.data);
    });
  }, []);

  function navigateToDevicesInRoom(id) {
    history.push(Routes.Rooms.devices.replace(':id', id));
  }

  return (
    <>
      {rooms.map((room) => (
        <div key={room.id} className="mb-3" onClick={() => navigateToDevicesInRoom(room.id)}>
          <Room
            key={room.id}
            name={room.name}
            icon={room.icon}
            devicesCount={2}
          />
        </div>
      ))}
    </>
  );
}
