# ChironSurvival - Emergency Medical Guidance

![ChironSurvival](https://images.pexels.com/photos/6502313/pexels-photo-6502313.jpeg)

[![Built with Bolt](https://img.shields.io/badge/Built%20with-Bolt-blue)](https://bolt.new)

ChironSurvival is an AI-powered emergency medical guidance application designed for wilderness survival situations where professional medical help is unavailable. This progressive web application (PWA) provides critical first-aid guidance and assessment tools for emergency situations.

## ⚠️ IMPORTANT DISCLAIMER

This application is:
- For emergency use in wilderness survival situations ONLY
- NOT a substitute for professional medical care
- To be used ONLY when professional medical help is unavailable
- A guidance tool, not a definitive medical authority

**ALWAYS seek professional medical help when available.**

## 🚀 Features

- **Emergency Assessment Tool**: AI-powered injury assessment and guidance
- **Follow-up Chat Interface**: Ongoing guidance for changing conditions
- **Offline Capability**: Works without internet connection
- **Photo Documentation**: Capture and document injuries
- **First Aid Guides**: Comprehensive emergency response guides
- **Emergency Contacts**: Store and manage emergency contact information
- **Assessment History**: Track and review previous assessments
- **Location Support**: GPS location recording for emergency services
- **PWA Support**: Install as a native app on mobile devices

## 💻 Demo

A live demo of ChironSurvival is available at: [https://chironsurvival.web.app](https://chironsurvival.web.app)

## 🛠️ Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- PWA capabilities
- **Primary Medical AI:** [Custom Medical MCP Server](https://github.com/HeyBatlle1/medical-mcp-server) (integrating Army Ranger Handbook protocols)
- **Fallback Medical AI:** Google Gemini AI

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HeyBatlle1/chronsurvival.git
   cd chronsurvival
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your configuration:
   ```env
   VITE_GOOGLE_AI_API_KEY=your_gemini_api_key
   # Add other non-Firebase environment variables here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── components/       # Reusable UI components
├── config/           # Application configuration
├── context/          # React context providers
├── pages/            # Application pages
├── services/         # API and backend services
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## 🚀 Deployment

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy to your hosting provider (e.g., Netlify, Vercel):
   ```bash
   # Deployment commands vary by provider
   # Example for Netlify: netlify deploy --prod
   ```

## 📱 PWA Installation

ChironSurvival can be installed as a Progressive Web App on both desktop and mobile devices:

1. Visit the application in a supported browser
2. Look for the "Add to Home Screen" prompt
3. Follow the installation instructions

## 🧪 Testing

To run tests:
```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **HeyBatlle1** - *Initial work* - [GitHub Profile](https://github.com/HeyBatlle1)

## 🙏 Acknowledgments

- Emergency medical professionals who provided guidance
- The open-source community
- All contributors and testers

## 📞 Support

For support, please open an issue in the GitHub repository.
