# 🛒 Cindelaras Kasir Frontend App

![Nuxt](https://img.shields.io/badge/Nuxt-4.4.2-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

A modern, fast, and responsive Point of Sale (POS) application frontend. This project leverages the power of Nuxt, Vue 3, and Tailwind CSS to deliver an intuitive cashier and management experience.

## ✨ Features

- **Modern UI/UX**: Built with [Tailwind CSS v4](https://tailwindcss.com/) and [Shadcn Vue](https://www.shadcn-vue.com/) for beautiful, accessible components.
- **Robust State & Routing**: Utilizing [Nuxt](https://nuxt.com/) for optimal routing and Vue 3 Composition API.
- **Form Validation**: Type-safe and rigorous form handling with [VeeValidate](https://vee-validate.logaretm.com/) and [Zod](https://zod.dev/).
- **Data Tables**: High-performance data grids with [@tanstack/vue-table](https://tanstack.com/table/latest).
- **Data Visualization**: Interactive charts powered by [ApexCharts](https://apexcharts.com/).
- **Fully Typed**: End-to-end type safety using TypeScript.

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn Vue](https://www.shadcn-vue.com/) & [Radix Vue](https://www.radix-vue.com/)
- **Icons**: [Lucide Vue](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your local environment:
- **Node.js** (v18.x or newer recommended)
- **pnpm** (v10.x or newer)

You can install `pnpm` globally via npm if you haven't already:
```bash
npm install -g pnpm
```

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/WeeAppaWe/Cindelaras_Kasir_Frontend_App.git
   cd Cindelaras_Kasir_Frontend_App
   ```

2. Install the project dependencies using `pnpm`:
   ```bash
   pnpm install
   ```

3. Set up your environment variables (if applicable):
   ```bash
   cp .env.example .env
   ```
   *(Make sure to adjust the variables in `.env` based on your backend or configuration requirements).*

### Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

### Production Build

To build the application for production, run:

```bash
pnpm run build
```

You can preview the production build locally by running:

```bash
pnpm run preview
```

## 📂 Project Structure

```text
├── .env.example       # Example environment variables
├── API_DOC/           # API Documentation
├── app/               # Nuxt application source code
├── docs/              # Project documentation
├── layers/            # Nuxt Layers
├── public/            # Static assets
├── nuxt.config.ts     # Nuxt configuration file
├── package.json       # Project dependencies & scripts
└── tsconfig.json      # TypeScript configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is closed-source and intended for internal use.

---
*Built with ❤️ by the development team.*
