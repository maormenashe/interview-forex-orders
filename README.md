# Forex Orders - NestJS Application

A NestJS application for managing forex orders with real-time updates, JWT authentication, and MongoDB integration.

## 🚀 Quick Start with GitHub Codespaces

This project is configured to run seamlessly in GitHub Codespaces with automatic setup.

### Getting Started

1. **Create a Codespace**
   - Go to your GitHub repository
   - Click the green "Code" button
   - Select the "Codespaces" tab
   - Click "Create codespace on main"
   - Wait for the container to build (2-3 minutes)

2. **Wait for Initial Setup**
   The Codespace will automatically:
   - ✅ Build the Docker container with Node.js 20
   - ✅ Start MongoDB 7 on port 27017
   - ✅ Install VS Code extensions (ESLint, Prettier, Jest, MongoDB, PDF viewer)
   - ✅ Run `npm install` to install all dependencies

3. **Start the Application**
   Once setup is complete, run:
   ```bash
   npm run start:dev
   ```

4. **Access Your Application**
   - The app will start on port 3000
   - **Check the console output** - the actual URL is displayed there
   - Swagger documentation: `https://your-codespace-url/api`
   - Or check the PORTS tab and click the globe icon

### 📊 MongoDB Connection

The MongoDB instance is running automatically in the container.

**Connection String:**
```
mongodb://localhost:27017/forex-orders
```

**Using VS Code MongoDB Extension:**
1. Open the MongoDB panel in the left sidebar
2. Click "Add Connection"
3. Enter: `mongodb://localhost:27017/forex-orders`
4. Click "Connect"


### 🛠️ Available Scripts

```bash
# Development
npm run start:dev          # Start in development mode with hot reload
npm run start:debug        # Start in debug mode (port 9229)
```

### 🔧 Development Tools

The devcontainer includes:
- **Node.js 20** - Latest LTS version
- **MongoDB 7** - Running automatically
- **VS Code Extensions**:
  - ESLint - Code linting
  - Prettier - Code formatting
  - Jest Runner - Test execution
  - MongoDB - Database management
  - PDF Viewer - View PDF documents

---

**Happy Coding! 🚀**

