import 'package:blq_test/chat_page.dart';
import 'package:dash_chat_2/dash_chat_2.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const HomePage(),
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.pink,
        ),
        useMaterial3: true,
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(
            seedColor: Colors.pink,
          ),
          useMaterial3: true,
        ),
        home: Scaffold(
          backgroundColor: Colors.black,
          body: 
          
            Center(
              child: ElevatedButton(
                  child: const Text("Chat"),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const MyChatPage(
                          title: 'Chat',
                        ),
                      ),
                    );
                  }),
            
          ),
        ));
  }
}

class GradientBackground extends StatelessWidget {
  const GradientBackground(
      {super.key, required this.gradient, required this.child});

  final Gradient gradient;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          decoration: BoxDecoration(
            gradient: gradient,
          ),
        ),
        child,
      ],
    );
  }
}

