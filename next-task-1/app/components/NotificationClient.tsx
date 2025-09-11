'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    PusherPushNotifications?: any;
  }
}

export default function NotificationClient() {
  useEffect(() => {
    const instanceId = process.env.NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID;
    if (!instanceId || !window.PusherPushNotifications) return;

    const beamsClient = new window.PusherPushNotifications.Client({
      instanceId,
    });

    beamsClient
      .start()
      .then(() => beamsClient.addDeviceInterest('admins'))
      .catch((e: any) => console.warn('Beams init failed', e));
  }, []);

  return null;
}
