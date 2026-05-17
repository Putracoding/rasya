import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Moon, Sun, Palette, Type, Layout, Check, X } from 'lucide-react';
import { useAuth } from './components/FirebaseProvider';
import { cn } from './lib/utils';

export default function App() {
  const { theme, updateTheme, loading } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f0f2f5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: theme.primaryColor }}></div>
      </div>
    );
  }

  const bgStyles = {
    default: theme.isDark ? 'bg-[#1c1e21]' : 'bg-[#f0f2f5]',
    gradient: `bg-gradient-to-br ${theme.isDark ? 'from-[#0f172a] to-[#1e1b4b]' : 'from-[#e0e7ff] to-[#f0f9ff]'}`,
    glass: `bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000')]`,
    image: `bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000')]`,
  };

  return (
    <div 
      className={cn(
        "min-h-screen transition-colors duration-500 overflow-x-hidden flex flex-col items-center justify-center",
        theme.bgType !== 'image' && theme.bgType !== 'glass' ? bgStyles[theme.bgType] : ''
      )}
      style={{ 
        fontFamily: theme.fontFamily,
        backgroundImage: (theme.bgType === 'image' || theme.bgType === 'glass') ? (theme.bgType === 'glass' ? `linear-gradient(rgba(0,0,0,${theme.isDark ? 0.7 : 0.4}), rgba(0,0,0,${theme.isDark ? 0.7 : 0.4})), url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000')` : `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000')`) : 'none'
      }}
    >
      {/* Floating Settings Button */}
      <button 
        id="theme-settings-btn"
        onClick={() => setShowSettings(true)}
        className="fixed top-6 right-6 p-3 bg-white dark:bg-zinc-800 rounded-full shadow-lg hover:scale-110 transition-transform z-50 text-gray-700 dark:text-gray-200"
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Main Container */}
      <div className="w-full max-w-[980px] px-4 flex flex-col md:flex-row items-center md:items-start md:justify-between py-10 md:pt-40 md:pb-20">
        
        {/* Left Side: Branding */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 md:pr-8">
          <h1 
            id="facebook-logo"
            className="text-6xl font-bold mb-4 tracking-tighter"
            style={{ color: theme.primaryColor }}
          >
            facebook
          </h1>
          <p className={cn(
            "text-2xl leading-8 md:max-w-md",
            theme.isDark ? "text-gray-300" : "text-gray-800"
          )}>
            Facebook membantu Anda terhubung dan berbagi dengan orang-orang dalam kehidupan Anda.
          </p>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full max-w-[400px] flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "w-full p-4 rounded-lg shadow-xl mb-6 border",
              theme.isDark ? "bg-[#242526] text-white border-gray-700" : "bg-white text-black border-gray-100",
              theme.bgType === 'glass' && "backdrop-blur-xl bg-white/70 dark:bg-black/70 border border-white/20"
            )}
          >
            <form className="flex flex-col space-y-4">
              <input 
                id="email-input"
                type="text" 
                placeholder="Email address or phone number" 
                className={cn(
                  "px-3.5 py-3.5 border rounded-md focus:outline-none focus:ring-1 text-lg",
                  theme.isDark ? "bg-[#3a3b3c] border-gray-600" : "bg-white border-gray-300"
                )}
                style={{ borderColor: theme.isDark ? undefined : undefined, '--tw-ring-color': theme.primaryColor } as any}
              />
              <input 
                id="password-input"
                type="password" 
                placeholder="Password" 
                className={cn(
                  "px-3.5 py-3.5 border rounded-md focus:outline-none focus:ring-1 text-lg",
                  theme.isDark ? "bg-[#3a3b3c] border-gray-600" : "bg-white border-gray-300"
                )}
                style={{ '--tw-ring-color': theme.primaryColor } as any}
              />
              <button 
                id="login-btn"
                type="button"
                className="w-full py-3 rounded-md text-xl font-bold text-white transition-all hover:brightness-95 active:scale-[0.98]"
                style={{ backgroundColor: theme.primaryColor }}
              >
                Log In
              </button>
              <div className="text-center">
                <a href="#" className="text-sm hover:underline text-center" style={{ color: theme.primaryColor }}>Forgotten password?</a>
              </div>
              <div className={cn("border-b my-2", theme.isDark ? "border-gray-600" : "border-gray-200")}></div>
              <div className="flex justify-center pt-2">
                <button 
                  id="create-account-btn"
                  type="button"
                  className="px-4 py-3 rounded-md text-lg font-bold text-white transition-all hover:brightness-95 active:scale-[0.98]"
                  style={{ backgroundColor: theme.secondaryColor }}
                >
                  Create new account
                </button>
              </div>
            </form>
          </motion.div>
          <p className={cn("text-sm", theme.isDark ? "text-gray-400" : "text-gray-600")}>
            <span className="font-bold cursor-pointer hover:underline">Create a Page</span> for a celebrity, brand or business.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className={cn(
        "w-full mt-auto py-10 px-4 flex justify-center",
        theme.isDark ? "bg-[#18191a] text-gray-500" : "bg-white text-gray-500"
      )}>
        <div className="max-w-[980px] w-full text-xs">
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 border-b border-gray-200 dark:border-gray-800 pb-2">
            <span>Bahasa Indonesia</span>
            <span>English (UK)</span>
            <span>Basa Jawa</span>
            <span>Bahasa Melayu</span>
            <span>日本語</span>
            <span>Español</span>
            <span>Português (Brasil)</span>
            <span>Français (France)</span>
            <span>Deutsch</span>
            <span>Italiano</span>
            <span>العربية</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span>Sign Up</span>
            <span>Log In</span>
            <span>Messenger</span>
            <span>Facebook Lite</span>
            <span>Video</span>
            <span>Tempat</span>
            <span>Game</span>
            <span>Marketplace</span>
            <span>Meta Pay</span>
            <span>Meta Store</span>
            <span>Meta Quest</span>
            <span>Instagram</span>
            <span>Threads</span>
          </div>
          <div className="mt-4">
            Meta © 2024
          </div>
        </div>
      </footer>

      {/* Theme Settings Drawer */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-[#242526] z-[70] shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                  <Palette className="w-6 h-6" /> Kustomisasi Tema
                </h2>
                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full dark:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Presets */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                    <Layout className="w-4 h-4" /> Tema Prasetel
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Classic Blue', primary: '#1877f2', dark: false, bg: 'default' },
                      { name: 'Dark Amethyst', primary: '#A855F7', dark: true, bg: 'default' },
                      { name: 'Natural Tones', primary: '#5A5A40', dark: false, bg: 'default' },
                      { name: 'Cherry Blossom', primary: '#F472B6', dark: false, bg: 'gradient' },
                    ].map((p) => (
                      <button 
                        key={p.name}
                        onClick={() => updateTheme({ primaryColor: p.primary, isDark: p.dark, bgType: p.bg as any })}
                        className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group"
                      >
                         <div className="h-10 w-full rounded border flex flex-col p-1 gap-1 mb-2" style={{ backgroundColor: p.dark ? '#151619' : '#f0f2f5' }}>
                            <div className="h-2 w-2/3 bg-gray-300 dark:bg-gray-600 opacity-50"></div>
                            <div className="h-3 w-full rounded-sm" style={{ backgroundColor: p.primary }}></div>
                         </div>
                         <p className="text-[10px] font-bold text-center dark:text-gray-300 group-hover:text-[#1877f2]">{p.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mode Gelap */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                    {theme.isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} Mode Tampilan
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => updateTheme({ isDark: false })}
                      className={cn(
                        "p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all",
                        !theme.isDark ? "border-[#1877f2] bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700 dark:text-gray-400"
                      )}
                    >
                      <Sun className="w-6 h-6" />
                      <span className="font-medium">Terang</span>
                      {!theme.isDark && <Check className="w-4 h-4 mt-1 text-[#1877f2]" />}
                    </button>
                    <button 
                      onClick={() => updateTheme({ isDark: true })}
                      className={cn(
                        "p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all",
                        theme.isDark ? "border-[#1877f2] bg-blue-50 dark:bg-blue-900/20 text-white" : "border-gray-200 dark:border-gray-700"
                      )}
                    >
                      <Moon className="w-6 h-6" />
                      <span className="font-medium">Gelap</span>
                      {theme.isDark && <Check className="w-4 h-4 mt-1 text-[#1877f2]" />}
                    </button>
                  </div>
                </div>

                {/* Gaya Latar Belakang */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                    <Layout className="w-4 h-4" /> Gaya Latar Belakang
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['default', 'gradient', 'glass', 'image'].map((type) => (
                      <button 
                        key={type}
                        onClick={() => updateTheme({ bgType: type as any })}
                        className={cn(
                          "px-4 py-3 rounded-lg border flex items-center justify-between capitalize transition-all",
                          theme.bgType === type 
                            ? "border-[#1877f2] bg-[#1877f2]/10 text-[#1877f2] font-bold" 
                            : "border-gray-200 dark:border-gray-700 dark:text-gray-400"
                        )}
                      >
                        {type}
                        {theme.bgType === type && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Warna Utama */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Warna Utama (Brand)
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['#0866FF', '#E4405F', '#1DA1F2', '#00BA7C', '#FF9500', '#AF52DE', '#FF2D55'].map((color) => (
                      <button 
                        key={color}
                        onClick={() => updateTheme({ primaryColor: color })}
                        className={cn(
                          "w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center",
                          theme.primaryColor === color ? "border-black dark:border-white scale-125" : "border-transparent"
                        )}
                        style={{ backgroundColor: color }}
                      >
                        {theme.primaryColor === color && <Check className="w-5 h-5 text-white" />}
                      </button>
                    ))}
                    <div className="relative group">
                      <input 
                        type="color" 
                        value={theme.primaryColor}
                        onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                        className="w-10 h-10 rounded-full cursor-pointer opacity-0 absolute inset-0 z-10"
                      />
                      <div 
                        className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gradient-to-tr from-red-500 via-green-500 to-blue-500"
                      >
                        <span className="text-[10px] text-white font-bold">Custom</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                    <Type className="w-4 h-4" /> Gaya Tulisan (Font)
                  </h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Inter (Bawaan)', value: 'Inter, sans-serif' },
                      { name: 'Serif (Elegan)', value: 'Georgia, serif' },
                      { name: 'Mono (Teknik)', value: 'JetBrains Mono, monospace' },
                      { name: 'Outfit (Modern)', value: 'Outfit, sans-serif' }
                    ].map((f) => (
                      <button 
                        key={f.value}
                        onClick={() => updateTheme({ fontFamily: f.value })}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border text-left transition-all",
                          theme.fontFamily === f.value 
                            ? "border-[#1877f2] bg-[#1877f2]/10 text-[#1877f2] font-bold" 
                            : "border-gray-200 dark:border-gray-700 dark:text-gray-400 font-medium"
                        )}
                        style={{ fontFamily: f.value }}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                  <button 
                    onClick={() => {
                      updateTheme({
                        primaryColor: '#1877f2',
                        secondaryColor: '#42b72a',
                        bgType: 'default',
                        fontFamily: 'Inter, sans-serif',
                        isDark: false,
                      });
                    }}
                    className="w-full py-3 text-gray-500 hover:text-red-500 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    Atur Ulang ke Bawaan
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
