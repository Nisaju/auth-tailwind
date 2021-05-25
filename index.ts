import { addImport, paths, RecipeBuilder } from "@blitzjs/installer";
import * as fs from "fs";
import j, { Collection } from "jscodeshift";
import { join } from "path";

const packageDev = JSON.parse(`${fs.readFileSync("./package.json")}`);

const isReactFinalForm =
  packageDev?.dependencies?.["react-final-form"] !== undefined;
const isReactHookForm =
  packageDev?.dependencies?.["react-hook-form"] !== undefined;
const isFormik = packageDev?.dependencies?.["formik"] !== undefined;

const useForm = isReactFinalForm
  ? "react-final-form"
  : isReactHookForm
  ? "react-hook-form"
  : isFormik
  ? "formik"
  : false;

if (!useForm)
  throw new Error(
    "Please install one of this package to install this recipe \n1. react-final-form\n2. react-hook-form\n3. formik"
  );

export default RecipeBuilder()
  .setName("Auth Tailwind")
  .setDescription(
    "This will install all necessary dependencies and configure Auth Tailwind for use."
  )
  .setOwner("Anjianto <anjianto06@gmail.com>")
  .setRepoLink("https://github.com/Anjianto/auth-tailwind")
  .addAddDependenciesStep({
    stepId: "addDeps",
    stepName: "Install dependencies",
    explanation:
      "Auth Tailwind requires a couple of dependencies including PostCSS for removing unused styles from the production bundle",
    packages: [
      { name: "@headlessui/react", version: "1.2.0" },
      { name: "@heroicons/react", version: "1.0.1" },
      { name: "tailwindcss", version: "2.1.2", isDevDep: true },
      { name: "autoprefixer", version: "10", isDevDep: true },
      { name: "postcss", version: "8", isDevDep: true },
      { name: "@tailwindcss/custom-forms", version: "0.2.1", isDevDep: true },
    ],
  })
  .addNewFilesStep({
    stepId: "addTailwindConfig",
    stepName: "Tailwind Config Files",
    explanation:
      "Add config files to give you a good starting point and remove .template from filename",
    targetDirectory: ".",
    templatePath: join(__dirname, "templates", "tailwindcss"),
    templateValues: {},
  })
  .addNewFilesStep({
    stepId: "addtyles",
    stepName: "Stylesheet",
    explanation: `Add a root CSS stylesheet where Tailwind is imported and where you can add global styles`,
    targetDirectory: "./app/core/styles",
    templatePath: join(__dirname, "templates", "app", "core", "styles"),
    templateValues: {},
  })
  .addTransformFilesStep({
    stepId: "importStyles",
    stepName: "Import stylesheets",
    explanation: `Imports the stylesheet we just added into your app`,
    singleFileSearch: paths.app(),
    transform(program: Collection<j.Program>) {
      const stylesImport = j.importDeclaration(
        [],
        j.literal("app/core/styles/index.css")
      );
      return addImport(program, stylesImport);
    },
  })
  .addNewFilesStep({
    stepId: "addCoreFile",
    stepName: "Core Files",
    explanation: "Add core files to give you a good development",
    targetDirectory: "./app/core/components",
    templatePath: join(
      __dirname,
      "templates",
      "app",
      "core",
      "components",
      "_forms",
      useForm
    ),
    templateValues: {},
  })
  .addNewFilesStep({
    stepId: "addBlitzLogoFile",
    stepName: "Logo Files",
    explanation: "Add Blitz logo files",
    targetDirectory: "./app/core/components",
    templatePath: join(
      __dirname,
      "templates",
      "app",
      "core",
      "components",
      "Logo"
    ),
    templateValues: {},
  })
  .addNewFilesStep({
    stepId: "addAuthFile",
    stepName: "Auth Files",
    explanation: "Add auth files to give you a secure app",
    targetDirectory: "./app/auth",
    templatePath: join(__dirname, "templates", "app", "auth"),
    templateValues: {},
  })
  .addNewFilesStep({
    stepId: "addCustomComponents",
    stepName: "Add Custom Components",
    explanation:
      "Add custom components files to give you a Home Page Beautifull",
    targetDirectory: "./app/components",
    templatePath: join(__dirname, "templates", "app", "components"),
    templateValues: {},
  })
  .addNewFilesStep({
    stepId: "addDashboard",
    stepName: "Add Dashboard",
    explanation: "Add Dashboard",
    targetDirectory: "./app/dashboard",
    templatePath: join(__dirname, "templates", "app", "dashboard"),
    templateValues: {},
  })
  .addNewFilesStep({
    stepId: "addConfig",
    stepName: "Add Config",
    explanation: "Add auth-tailwind Config",
    targetDirectory: "./config",
    templatePath: join(__dirname, "templates", "config"),
    templateValues: {},
  })
  .addNewFilesStep({
    stepId: "addSchema",
    stepName: "Add Schema",
    explanation: "Add Schema for db",
    targetDirectory: "./db",
    templatePath: join(__dirname, "templates", "db"),
    templateValues: {},
  })
  .addNewFilesStep({
    stepId: "addCustomHomePage",
    stepName: "Add Custom Home Page",
    explanation: "Add custom Home Page",
    targetDirectory: "./app/pages",
    templatePath: join(__dirname, "templates", "app", "pages"),
    templateValues: {},
  })
  .build();
