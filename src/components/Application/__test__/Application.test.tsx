import { render, screen } from '@testing-library/react';
import { Application } from '../Application';

describe('Application', () => {
  
    it('renders correctly', () => {
        render(<Application />);

        const pageHeading = screen.getByRole('heading', {level : 1});
        expect(pageHeading).toBeInTheDocument();

        const sectionElement = screen.getByRole('heading', {level: 2})
        expect(sectionElement).toBeInTheDocument();

        const jobLocaltionElement = screen.getByRole('combobox')
        expect(jobLocaltionElement).toBeInTheDocument();

        const nameInputElement = screen.getAllByRole('textbox')[0]
        expect(nameInputElement).toBeInTheDocument();
        expect(nameInputElement).toHaveAttribute("placeholder", 'Fullname');

        const bioElement = screen.getByRole('textbox', {name: 'Bio'})
        expect(bioElement).toBeInTheDocument();

        const nameInputElementByName = screen.getByRole('textbox', {name: 'Name'})
        expect(nameInputElementByName).toBeInTheDocument();

        const inputNameElementByLabelText = screen.getByLabelText('Name')
        expect(inputNameElementByLabelText).toBeInTheDocument();

        const termsElements = screen.getByRole('checkbox')
        expect(termsElements).toBeInTheDocument();

        const termsElementsByLabeText = screen.getByLabelText('I agree to the terms and conditions', {selector: 'input[type="checkbox"]'})
        expect(termsElementsByLabeText).toBeInTheDocument();

        const submitButtonElement = screen.getByRole('button', { name: 'Submit' })
        expect(submitButtonElement).toBeInTheDocument();

        const fullNamePlaceholder = screen.getByPlaceholderText('fullnam', {exact: false})
        expect(fullNamePlaceholder).toBeInTheDocument();

        const warningAboutFields = screen.getByText(/all fields are mandatory/i, {selector: 'p'})
        expect(warningAboutFields).toBeInTheDocument();

        const getInputByDefaultValue = screen.getByDisplayValue('Vishwas');
        expect(getInputByDefaultValue).toBeInTheDocument();

        const getImageByAltText = screen.getByAltText(/a person with/);
        expect(getImageByAltText).toBeInTheDocument();

        const closeButtonByTitle = screen.getByTitle('close')
        expect(closeButtonByTitle).toBeInTheDocument();

        const getCustomHtmlElementByDataTestId = screen.getByTestId('custom-element')
        expect(getCustomHtmlElementByDataTestId).toBeInTheDocument();
    })
})