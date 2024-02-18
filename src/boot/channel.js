import { Socket } from 'phoenix';
import { Dialog } from 'quasar';

import { useAuthStore } from 'src/store/authStore';
import { useConfigStore } from 'src/store/configStore';
import { useUserStore } from 'src/store/userStore';

import { useI18n } from 'src/boot/i18n';
import router from 'src/router';

let socket;
let channel;

export function joinChannel() {
  const authStore = useAuthStore();

  socket = new Socket('/socket', {
    params: () => {
      if (!!authStore.refreshToken) {
        return { token: authStore.refreshToken };
      } else {
        return {};
      }
    },
    reconnectAfterMs: (_) => 1000,
  });

  socket.connect();

  channel = socket.channel('room:lobby', () => {
    return { page: router.currentRoute.value.path };
  });
  channel
    .join()
    .receive('ok', (resp) => {
      console.log('Joined successfully', resp);
    })
    .receive('error', (resp) => {
      console.log('Unable to join', resp);
    });

  // channel.onError((reason) => {
  //   userStore.logout();
  //   authStore.logout();

  //   leaveChannel();

  //   router.push({ name: 'Login' });
  // });

  const configStore = useConfigStore();
  const userStore = useUserStore();
  // const authStore = useAuthStore();

  const { t } = useI18n();

  channel.on('config_updated', () => configStore.fetch());

  channel.on('vip_privilege_updated', () => configStore.fetchVipPrivileges());

  channel.on('user_updated', ({ user }) => userStore.setUser(user));

  channel.on('bankcard_updated', ({ bankcard }) =>
    userStore.setBankcard(bankcard),
  );

  channel.on('pix_wallet_updated', ({ wallet }) =>
    userStore.setPixWallet(wallet),
  );

  channel.on('wallet_updated', ({ wallet }) => userStore.setWallet(wallet));

  channel.on('team_updated', ({ team }) => userStore.setTeam(team));

  channel.on(
    'unread_message_count',
    ({ unread_message_count: unreadMessageCount }) =>
      userStore.setUnreadMessageCount(unreadMessageCount),
  );

  channel.on('kickoff', () => {
    userStore.logout();
    authStore.logout();

    leaveChannel();

    Dialog.create({
      title: t('common.hint'),
      message: t('account.message.kickedOff'),
      persistent: true,
    }).onOk(() => {
      router.push({ name: 'Login' });
    });
  });
}

export function pushEvent(event, payload) {
  if (channel) {
    channel.push(event, payload);
  }
}

export function leaveChannel() {
  if (channel) {
    channel.leave();
    channel = null;
  }

  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
