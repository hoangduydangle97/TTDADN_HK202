import React, { useState } from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useMqttState } from 'mqtt-react-hooks';
import { getTopic } from '../../utils';
import AlarmButton from './AlarmButton';
import { useFeedData } from '../../hooks/useFeedData';

const FireAlarm = () => {
    const [open, setOpen] = useState(false);
    const { client } = useMqttState();
    const status = useFeedData('fire')

    React.useEffect(() => {
        status === 'ON' ? setOpen(true) : setOpen(false);
    }, [status]);

    const handleClick = () => {
        client.publish(getTopic('fire'), status === 'ON' ? 'OFF' : 'ON');
    }

    return (
        <div>
            <div>
                <Modal open={open} onClose={() => setOpen(false)} center>
                <h2>Smoke n Fire</h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                hendrerit risus, sed porttitor quam.
                </p>
                <p>Device:              ...</p>
                <p>Type:              ...</p>
                <p>Room:              ...</p>
                <p>Time:              ...</p>
                <button className='btn btn-block' type="button" onClick={handleClick}>
                    Check
                </button>
                </Modal>
            </div>
            <AlarmButton color={status === 'ON' ? 'red' : 'orange'} text={status === 'ON' ? 'Turn Off Fire Alarm' : 'Turn On Fire Alarm'} handleClick={handleClick} />
        </div>
    )
}

export default FireAlarm
