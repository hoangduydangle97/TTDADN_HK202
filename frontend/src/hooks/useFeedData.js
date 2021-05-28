import { useSubscription } from 'mqtt-react-hooks';
import React from 'react';
import { AdafruitService } from 'services/adafruit.service';
import { getTopic } from 'utils';

export function useFeedData(feed) {
  const { message } = useSubscription(getTopic(feed));
  const [status, setStatus] = React.useState('');

  React.useEffect(() => {
    AdafruitService.getFeedData(feed).then((res) => {
      setStatus(res?.data[0]?.value || '');
    });
  }, [feed]);

  React.useEffect(() => {
    if (message?.topic === getTopic(feed)) {
      let val = message ? message.message.toString() : '';
      setStatus(val);
    }
  }, [feed, message]);

  return status;
}
