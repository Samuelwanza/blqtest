import 'package:dash_chat_2/dash_chat_2.dart';
import 'package:flutter/material.dart';
import 'package:sendbird_sdk/sendbird_sdk.dart';

class MyChatPage extends StatefulWidget {
  const MyChatPage({super.key, required this.title});
  final String title;

  @override
  State<MyChatPage> createState() => _MyChatPageState();
}

class _MyChatPageState extends State<MyChatPage> with ChannelEventHandler {
  final applicationId = 'BC823AD1-FBEA-4F08-8F41-CF0D9D280FBF';
  final user1 = 'Wonka';
  final user2 = 'Charlie';

  late GroupChannel _channel;
  List<BaseMessage> _messages = [];

  @override
  void initState() {
    super.initState();
    connection();
    SendbirdSdk().addChannelEventHandler("chat", this);
  }

  @override
  void dispose() {
    super.dispose();
    SendbirdSdk().removeChannelEventHandler('chat');
  }

  @override
  void onMessageReceived(BaseChannel channel, BaseMessage message) {
    super.onMessageReceived(channel, message);
    setState(() {
      _messages.add(message);
      _messages.sort(
          (a, b) => a.createdAt.compareTo(b.createdAt)); // Sort by timestamp
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.black,
        appBar: AppBar(
          backgroundColor: Colors.black,
          iconTheme: const IconThemeData(color: Colors.white),
          title: Text(
            widget.title,
            style: const TextStyle(color: Colors.white),
          ),
          centerTitle: true,
          actions: [
            IconButton(
                onPressed: () {},
                icon: const Icon(
                  Icons.menu,
                  color: Colors.white,
                ))
          ],
        ),
        body: Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: DashChat(
            currentUser: chatUser(SendbirdSdk().currentUser ??
                User(userId: '', nickname: 'Charlie')),
            onSend: (dashMessage) {
              final sentMessage =
                  _channel.sendUserMessageWithText(dashMessage.text);
              setState(() {
                _messages.add(sentMessage);
              });
            },
            messages: chatMessages(_messages),
            messageOptions: const MessageOptions(
              showTime: true,
              containerColor: Color.fromARGB(255, 26, 25, 25),
              textColor: Colors.white,
            ),
            inputOptions: InputOptions(
              alwaysShowSend: true,
              showTraillingBeforeSend: true,
              // sendButtonBuilder: (send) {
              //   return IconButton(
              //     icon: const Icon(
              //       Icons.arrow_circle_up,
              //       color: Colors.pink,
              //     ),
              //     onPressed: () {
              //       defaultSendButton(color: Colors.pink);
              //     },
              //   );
              // },
              inputTextStyle: const TextStyle(color: Colors.white),
              inputDecoration: InputDecoration(
                contentPadding: const EdgeInsets.all(8),
                hintText: 'Write a message...',
                hintStyle:
                    const TextStyle(color: Color.fromARGB(146, 255, 255, 255)),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30),
                  borderSide: const BorderSide(
                    color: Color.fromARGB(255, 188, 186, 186),
                  ),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30),
                  borderSide: const BorderSide(
                    color: Color.fromARGB(255, 188, 186, 186),
                  ),
                ),
              ),
              leading: [
                IconButton(
                  icon: const Icon(
                    Icons.add,
                    color: Colors.white,
                  ),
                  onPressed: () {},
                )
              ],
            ),
          ),
        ));
  }

  ChatUser chatUser(User user) {
    if (user == null) {
      return ChatUser(id: '', firstName: '', profileImage: '');
    } else {
      return ChatUser(
        id: user.userId,
        firstName: user.nickname.isEmpty ? '' : user.nickname,
        // profileImage: user.profileUrl.isEmpty ? user.profileUrl : ''
      );
    }
  }

  List<ChatMessage> chatMessages(List<BaseMessage> messages) {
    return [
      for (BaseMessage sendbirdMessage in messages)
        ChatMessage(
          text: sendbirdMessage.message,
          user: chatUser(sendbirdMessage.sender!),
          createdAt: DateTime.fromMillisecondsSinceEpoch(
              sendbirdMessage.createdAt), // Use actual timestamp
        )
    ];
  }

  void connection() async {
    // initialize and connect sendbird
    try {
      final sendbird = SendbirdSdk(appId: applicationId);
      final _ = await sendbird.connect(user1);
      // group channel
      final query = GroupChannelListQuery()
        ..limit = 1
        ..userIdsExactlyIn = [user2];
      final channels = await query.loadNext();
      if (channels.isEmpty) {
        // create a new channel
        _channel = await GroupChannel.createChannel(
            GroupChannelParams()..userIds = [user1, user2]);
      } else {
        _channel = channels[0];
      }

      // get messages
      final messages = await _channel.getMessagesByTimestamp(
          DateTime.now().millisecondsSinceEpoch * 1000, MessageListParams());

      setState(() {
        _messages = messages;
        _messages.sort(
            (a, b) => a.createdAt.compareTo(b.createdAt)); // Sort by timestamp
      });
    } catch (e) {
      print(e);
    }
  }
}
