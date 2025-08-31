# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# Add any project specific keep options here:

# Preserve TTS and audio related classes
-keep class net.no_mad.tts.** { *; }
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.modules.core.** { *; }

# Preserve audio permissions and settings
-keep class android.media.** { *; }
-keep class android.media.audiofx.** { *; }

# Preserve React Native audio modules
-keep class com.facebook.react.modules.audio.** { *; }
-keep class expo.modules.audio.** { *; }

# Preserve voice and speech related classes
-keep class * implements android.speech.tts.TextToSpeech$OnInitListener { *; }
-keep class * implements android.speech.tts.TextToSpeech$OnUtteranceCompletedListener { *; }
