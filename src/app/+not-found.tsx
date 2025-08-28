/*
 * @Description: 
 */


import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import LayoutView from '../components/atoms/LayoutView';
import LayoutText from '../components/atoms/LayoutText';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const NotFoundScreen = () => {
  return (
    <SafeAreaView>
      <LayoutView 
        isFlex
        isBgBlack
      >
        <LinearGradient
          colors={['#0a0a0a', '#1a1a1a']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        
        <LayoutView 
          isFlex
          isJustifyCenter
          isItemsCenter
          hasPadding
          customClasses="p-5"
        >
          <MaterialIcons name="photo-camera" size={80} color="#FFD700" />
          <LayoutText 
            isText3xl
            isFontBold
            isTextWhite
            hasMarginTop
            hasMarginBottom
            customClasses="mt-5 mb-2.5"
          >
            Page Not Found
          </LayoutText>
          <LayoutText 
            isTextBase
            isTextGray300
            isTextCenter
            hasMarginBottom
            customClasses="mb-10 leading-[22px]"
          >
            Sorry, the page you are looking for does not exist.
          </LayoutText>
          
          <TouchableOpacity
            onPress={() => router.push('/')}
            style={{
              backgroundColor: '#fbbf24',
              paddingHorizontal: 32,
              paddingVertical: 16,
              borderRadius: 9999,
            }}
          >
            <LayoutText 
              isTextBlack
              isFontBold
              isTextBase
            >
              Return Home
            </LayoutText>
          </TouchableOpacity>
        </LayoutView>
      </LayoutView>
    </SafeAreaView>
  );
};

export default NotFoundScreen;
