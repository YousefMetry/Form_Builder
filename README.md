# Easy Form Builder

## 🚀 Quick Start (after cloning from GitHub)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open your browser at [http://localhost:3000](http://localhost:3000)

Create your own forms quickly and visually—no coding needed! This app lets you add fields, set up simple rules, and see your form update instantly. Perfect for making surveys, sign-up forms, or any custom form you need.

## ✨ What You Can Do

- **Add fields:** Text, number, dropdown, and date fields.
- **Edit fields:** Change the label, make a field required, or add options to dropdowns.
- **Show or hide fields:** For dropdown fields, you can set up simple rules (like “Show this field only if another field is ‘Yes’”).
- **See changes live:** The preview updates as you build.
- **Test your form:** Fill it out and see how it works right away.

## 🚦 Quick Example

1. Add a text field for “Name”.
2. Add a dropdown for “Are you a student?” with “Yes” and “No”.
3. Add another text field for “School Name”.
4. Set a rule on “School Name” to show only if “Are you a student?” is “Yes”.
5. Try it out in the preview—when you pick “No”, the “School Name” field disappears!

## 🛠️ How to Use

1. **Add fields:** Click the buttons to add text, number, dropdown, or date fields.
2. **Edit fields:** Click on a field to change its label or make it required. For dropdowns, add or remove options.
3. **Set up rules:** For dropdown fields, click “Add Condition” to show or hide fields based on answers.
4. **Preview and test:** The right side shows your form as users will see it. Try filling it out!

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm start
   ```
3. Open your browser at `http://localhost:3000`

---

**Build forms your way—fast, simple, and visual!**

## 📖 Usage Guide

### Getting Started

1. **Add Fields**: Use the action buttons at the top to add different field types
   - "Add Text Field" - Creates a text input field
   - "Add Number Field" - Creates a number input field  
   - "Add Dropdown" - Creates a dropdown with options

2. **Configure Fields**: For each field, you can:
   - Edit the label by clicking on the label input
   - Toggle required/optional using the checkbox
   - For dropdowns: add/remove options using the option management interface

3. **Add Conditional Logic**: 
   - Click "Add Condition" on any field
   - Select a target field from the dropdown
   - Choose an operator (equals/not equals)
   - Enter or select a value
   - The condition status will be displayed in real-time

4. **Test in Preview**: 
   - The live preview updates automatically as you build
   - Fill out the form to test conditional logic
   - Submit the form to see validation and results

### Example Workflow

1. **Add a Text Field** labeled "First Name" (required)
2. **Add a Dropdown** labeled "Are you employed?" with options "Yes" and "No" (required)
3. **Add another Text Field** labeled "Employer Name"
4. **Add a condition** to the "Employer Name" field:
   - Target field: "Are you employed?"
   - Operator: "equals"
   - Value: "Yes"
5. **Test the form**:
   - If "Are you employed?" is "No", "Employer Name" is hidden
   - If "Are you employed?" is "Yes", "Employer Name" appears and must be filled

### Sample Form

Click "Load Sample Form" to see a pre-configured example that demonstrates:
- Basic field types
- Conditional logic
- Required field validation
- Form submission with JSON output

## 🏗️ Technical Architecture

### State Management
- **React Hooks**: Uses useState and useEffect for state management
- **Local Storage**: Automatic persistence of form configuration
- **Real-time Updates**: All state changes trigger immediate UI updates

### Component Structure
```
App.js (Main container)
├── FormBuilder (Left panel)
│   ├── FieldCard (Individual field configuration)
│   └── ConditionBuilder (Conditional logic interface)
└── FormPreview (Right panel)
    └── Live form preview with validation
```

### Key Features Implementation

#### Conditional Logic Engine
- Evaluates conditions in real-time based on preview values
- Supports multiple field types as condition targets
- Provides visual feedback on condition status

#### Form Validation
- Validates required fields only when visible
- Respects conditional logic in validation rules
- Displays clear error messages

#### Responsive Design
- CSS Grid layout for main content areas
- Flexbox for component layouts
- Mobile-first responsive breakpoints

## 🎨 Design Features

### Visual Design
- **Modern Gradient Header**: Eye-catching gradient background
- **Card-based Layout**: Clean, organized field cards
- **Color-coded Status**: Visual indicators for condition status
- **Smooth Animations**: Hover effects and transitions

### User Experience
- **Intuitive Icons**: Clear visual cues for actions
- **Progressive Disclosure**: Complex features revealed as needed
- **Error Prevention**: Disabled states and validation feedback
- **Accessibility**: Proper labeling and semantic HTML

## 🔧 Customization

### Adding New Field Types
To add new field types (e.g., date, checkbox):

1. Update the `addField` function in `App.js`
2. Add the field type to the type mapping in `FieldCard.js`
3. Add rendering logic in `FormPreview.js`
4. Update CSS styles as needed

### Extending Conditional Logic
To add more complex conditions:

1. Modify the `isFieldVisible` function in `App.js`
2. Add new operators to `ConditionBuilder.js`
3. Update the condition evaluation logic

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build folder contains the production-ready files that can be deployed to any static hosting service.

### Deployment Options
- **Netlify**: Drag and drop the build folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the gh-pages package
- **AWS S3**: Upload build files to S3 bucket

## 🤝 Contributing

This project demonstrates modern React development practices:

- **Functional Components**: All components use function syntax
- **React Hooks**: useState, useEffect for state management
- **Vanilla CSS**: No external UI libraries
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Semantic HTML and ARIA considerations

## 📝 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using React and modern web technologies** 