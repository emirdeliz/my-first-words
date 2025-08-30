import SpeechServiceTest from './SpeechServiceTest';

/**
 * Script para executar testes dos serviços de fala
 * 
 * Execute este arquivo para testar se todos os serviços
 * estão funcionando corretamente após a migração
 */
export const runSpeechTests = async (): Promise<void> => {
  console.log('🚀 Starting Speech Service Tests...\n');
  
  try {
    // Executar todos os testes
    await SpeechServiceTest.runAllTests();
    
    // Executar testes específicos da plataforma
    await SpeechServiceTest.testAndroidSpecific();
    await SpeechServiceTest.testIOSSpecific();
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('✅ Speech services are working correctly');
    console.log('✅ Migration from expo-speech completed');
    
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    console.error('❌ Some speech services may not be working');
    console.error('❌ Check the logs above for specific errors');
  }
};

// Executar testes se chamado diretamente
if (require.main === module) {
  runSpeechTests().catch(console.error);
}

export default runSpeechTests;
