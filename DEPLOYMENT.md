# Deployment Guide

## Quick Netlify Deployment

### Method 1: Drag & Drop (Easiest)
1. Download the `quiz-study-tool-netlify.zip` file
2. Extract the ZIP file to get the `quiz-study-tool` folder
3. Go to [Netlify Drop](https://app.netlify.com/drop)
4. Drag the entire `quiz-study-tool` folder onto the deployment area
5. Wait for deployment to complete
6. Your quiz tool is now live!

### Method 2: Git Repository
1. Create a new repository on GitHub
2. Upload all the project files to your repository
3. Go to [Netlify](https://app.netlify.com)
4. Click "New site from Git"
5. Connect your GitHub repository
6. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: (leave empty or set to ".")
7. Click "Deploy site"

### Method 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to project directory
cd quiz-study-tool

# Deploy
netlify deploy --prod --dir .
```

## Post-Deployment

After deployment, your quiz tool will be available at a Netlify URL like:
`https://amazing-name-123456.netlify.app`

### Custom Domain (Optional)
1. In your Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the instructions to configure your domain

### Features Available After Deployment
- ✅ Full quiz functionality
- ✅ Local storage persistence
- ✅ Responsive design for mobile/desktop
- ✅ Offline capability (PWA-ready)
- ✅ Fast global CDN delivery via Netlify

## Troubleshooting

### Common Issues
- **404 errors**: The `netlify.toml` file handles routing
- **Blank page**: Check browser console for JavaScript errors
- **Quiz not saving**: Ensure local storage is enabled in browser

### Support
- Check the main README.md for usage instructions
- Refer to the LLM prompt template for creating quiz content
- All functionality is client-side, no server configuration needed

---

**Your Interactive Quiz Study Tool is ready to help you master any subject! 🎯📚**

