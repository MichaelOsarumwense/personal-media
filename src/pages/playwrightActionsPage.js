import React, { useState } from 'react';
import LoginLayout from '../components/layout/loginLayout';

function PlaywrightActionsPage() {
	const [submitted, setSubmitted] = useState(false);
	const [previewName, setPreviewName] = useState('');

	function submitHandler(event) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const firstName = formData.get('firstName').trim();
		const lastName = formData.get('lastName').trim();

		if (!firstName || !lastName) {
			setSubmitted(false);
			return;
		}

		setPreviewName(`${firstName} ${lastName}`);
		setSubmitted(true);
	}

	return (
		<LoginLayout linkText={'Login'} linkRoute={'/login'}>
			<div className="content-w3ls actions-page" data-testid="playwright-actions-page">
				<div className="content-bottom">
					<div className="actions-page__header">
						<span className="actions-page__eyebrow">Playwright lesson</span>
						<h2>Actions and commands</h2>
						<p>
							Practice the commands that make Playwright interact with a page after a locator
							finds an element.
						</p>
					</div>

					<form aria-label="Playwright actions form" onSubmit={submitHandler}>
						<label className="label" htmlFor="firstName">
							First name
						</label>
						<div className="field-group required">
							<span className="fa fa-user" aria-hidden="true" />
							<div className="wthree-field">
								<input
									name="firstName"
									id="firstName"
									type="text"
									placeholder="First name"
									required
								/>
							</div>
						</div>

						<label className="label" htmlFor="lastName">
							Last name
						</label>
						<div className="field-group required">
							<span className="fa fa-id-card" aria-hidden="true" />
							<div className="wthree-field">
								<input
									name="lastName"
									id="lastName"
									type="text"
									placeholder="Last name"
									required
								/>
							</div>
						</div>

						<label className="label" htmlFor="country">
							Country
						</label>
						<div className="field-group required">
							<span className="fa fa-globe" aria-hidden="true" />
							<div className="wthree-field">
								<select name="country" id="country" required defaultValue="">
									<option value="" disabled>
										Select country
									</option>
									<option value="gb">United Kingdom</option>
									<option value="us">United States</option>
									<option value="ng">Nigeria</option>
									<option value="ca">Canada</option>
								</select>
							</div>
						</div>

						<fieldset className="actions-choice-group">
							<legend className="label">Sex</legend>
							<label htmlFor="sexFemale" className="actions-check">
								<input name="sex" id="sexFemale" type="checkbox" value="female" />
								<span>Female</span>
							</label>
							<label htmlFor="sexMale" className="actions-check">
								<input name="sex" id="sexMale" type="checkbox" value="male" />
								<span>Male</span>
							</label>
							<label htmlFor="sexPreferNot" className="actions-check">
								<input name="sex" id="sexPreferNot" type="checkbox" value="prefer-not-to-say" />
								<span>Prefer not to say</span>
							</label>
						</fieldset>

						<fieldset className="actions-choice-group">
							<legend className="label">Preferences</legend>
							<label htmlFor="emailUpdates" className="actions-check">
								<input name="emailUpdates" id="emailUpdates" type="checkbox" />
								<span>Email updates</span>
							</label>
							<label htmlFor="smsUpdates" className="actions-check">
								<input name="smsUpdates" id="smsUpdates" type="checkbox" />
								<span>SMS updates</span>
							</label>
						</fieldset>

						<label className="label" htmlFor="notes">
							Notes
						</label>
						<div className="field-group actions-textarea">
							<span className="fa fa-comment" aria-hidden="true" />
							<div className="wthree-field">
								<textarea
									name="notes"
									id="notes"
									placeholder="Try press(), clear(), or keyboard shortcuts here"
									rows="3"
								/>
							</div>
						</div>

						<div className="actions-hover-panel">
							<button type="button" className="actions-hover-button">
								Hover for help
							</button>
							<div className="actions-hover-content" role="note">
								This panel appears on hover, so it is useful for demonstrating hover().
							</div>
						</div>

						<div className="wthree-field">
							<button id="submitButton" type="submit" className="btn">
								Submit
							</button>
						</div>

						{submitted && (
							<div className="actions-status" role="status">
								Submitted
								<span>{previewName}</span>
							</div>
						)}
					</form>
				</div>
			</div>
		</LoginLayout>
	);
}

export default PlaywrightActionsPage;
