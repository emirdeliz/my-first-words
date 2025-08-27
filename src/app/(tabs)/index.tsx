import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import LayoutView from '../../components/atoms/LayoutView';
import LayoutText from '../../components/atoms/LayoutText';

const NotFoundScreen = () => {
  return (
    <SafeAreaView>
      <LayoutView 
        isFlex={true}
        isBgBlack={true}
      >
        <LinearGradient
          colors={['#0a0a0a', '#1a1a1a']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        
        <LayoutView 
          isFlex={true}
          isJustifyCenter={true}
          isItemsCenter={true}
          hasPadding={true}
          customClasses="p-5"
        >
          <MaterialIcons name="photo-camera" size={80} color="#FFD700" />
          <LayoutText 
            isText3xl={true}
            isFontBold={true}
            isTextWhite={true}
            hasMarginTop={true}
            hasMarginBottom={true}
            customClasses="mt-5 mb-2.5"
          >
            Home
          </LayoutText>
        </LayoutView>
      </LayoutView>
    </SafeAreaView>
  );
};

export default NotFoundScreen;
