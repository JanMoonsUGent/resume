const cookieTypes = [
	{
		title: "Strictly necessary and essential cookies",
		key: "Essential",
		intro: "This web page uses the technical essential cookies displayed in the table below. These cookies are technically speaking necessary to use the website. Due to the technical necessity of these cookies, we only have an obligation to provide information on these cookies. They are placed as soon as one accesses the website and cannot be declined.",
		toggleable: false,
		cookies: [
			// {
			// 	name: ".AspNetCore.Session",
			// 	expiry: "Session",
			// 	content: "Session Identifier for each unique browser session",
			// 	purpose: "The cookie session ID is sent to the app with each request and is used by the app to fetch the session data."
			// },
			{
				name: "hideCookieBar",
				expiry: "1 year",
				content: "Consent for cookies on TMC",
				purpose: "This cookie is used to remember cookie preferences set in the application"
			},
			{
				name: "cookiePreferences",
				expiry: "1 year",
				content: "Consent for cookies on TMC",
				purpose: "This cookie is used to remember cookie preferences set in the application"
			},
			{
				name: "langCode",
				expiry: "3 months",
				content: "Sets default language",
				purpose: "This cookie is used to identify the language of a user so we can provide them with the correct webpage language"
			},
			// {
			// 	name: "ai_session",
			// 	expiry: "30 minutes",
			// 	content: "Session Identifier for each unique browser session set by our authentication application, third-party cookie",
			// 	purpose: "The cookie session ID is sent to our authentication and platform application with each request and is used to verify authentication duration"
			// },
			// {
			// 	name: "x-ms-cpim-sso:tmcauth.onmicrosoft.com_0",
			// 	expiry: "Session",
			// 	content: "Cookie set by our authentication application",
			// 	purpose: "Used for maintaining the SSO session. This cookie is set as persistent, when Keep Me Signed In is enabled."
			// },
			// {
			// 	name: "x-ms-cpim-csrf",
			// 	expiry: "Session",
			// 	content: "Cookie set by our authentication application",
			// 	purpose: "Cross-Site Request Forgery token used for CRSF protection."
			// },
			// {
			// 	name: "ai_user",
			// 	expiry: "1 day",
			// 	content: "User identifier set by our authentication application, third-party cookie",
			// 	purpose: "The user ID is sent to our authentication and platform application with each request and is used to verify authentication."
			// }
		]
	},
	// {
	// 	title: "Functional cookies",
	// 	key: "Functional",
	// 	intro: "In addition, these functional cookies are set. These cookies cannot be declined when you want to access <a href=\"www.themasterchannel.com\">www.themasterchannel.com</a>, but will only be placed after a choice has been made concerning the cookie policy. These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality will become unavailable.",
	// 	toggleable: false,
	// 	cookies: [
	// 		{
	// 			name: "intercom-id-*",
	// 			expiry: "9 months",
	// 			content: "Visitor identifier set by Intercom",
	// 			purpose: "This cookie is an anonymous visitor identification cookie."
	// 		},
	// 		{
	// 			name: "intercom-session-*",
	// 			expiry: "1 week",
	// 			content: "Session identifier for each unique browser session set by Intercom",
	// 			purpose: "This cookie is used to keep track of sessions and remember logins and conversations."
	// 		}
	// 	]
	// },
	{
		title: "Performance and analytical cookies",
		key: "Analytical",
		intro: "In addition, the following analytical cookies are set. These cookies can be declined when surfing on <a href=\"https://www.themasterchannel.com\">www.themasterchannel.com</a>. They are used to analyze the usage of our website to identify improvement areas.",
		toggleable: true,
		cookies: [
			{
				name: "_ga",
				expiry: "2 years",
				content: "Identifier and timestamp set by google",
				purpose: "This cookie is used to generate statistical data to know how a visitor uses the website to improve the user experience."
			},
			{
				name: "_gat",
				expiry: "1 minute",
				content: "Check on site traffic",
				purpose: "This cookie is used to throttle the request rate, thus limiting the collection of data on high traffic sites"
			},
			{
				name: "_gid",
				expiry: "1 day",
				content: "Identifier and timestamp set by google",
				purpose: "This cookie is used to generate statistical data to know how a visitor uses the website to improve the user experience and to store and update a unique value for each page visited."
			},
			// {
			// 	name: "ai_session",
			// 	expiry: "30 minutes",
			// 	content: "Identifier of session and timestamp to match users of the application",
			// 	purpose: "This anonymous session identifier is used to match users and see how they use the website to improve the user experience by collecting statistical usage and telemetry information."
			// },
			// {
			// 	name: "ai_user",
			// 	expiry: "1 year",
			// 	content: "Identifier and timestamp to match users of the application",
			// 	purpose: "This cookie is used to match users and see how they use the website to improve the user experience by collecting statistical usage and telemetry information."
			// },
			// {
			// 	name: "_hjSessionTooLarge",
			// 	expiry: "Session",
			// 	content: "true/false",
			// 	purpose: "Causes Hotjar to stop collecting data if a session becomes too large. This is determined automatically by a signal from the WebSocket server if the session size exceeds the limit."
			// },
			// {
			// 	name: "_hjid",
			// 	expiry: "365 days",
			// 	content: "UUID",
			// 	purpose: "Hotjar cookie that is set when the customer first lands on a page with the Hotjar script. It is used to persist the Hotjar User ID, unique to that site on the browser. This ensures that behavior in subsequent visits to the same site will be attributed to the same user ID."
			// },
			// {
			// 	name: "_hjTLDTest",
			// 	expiry: "Session",
			// 	content: "true/false",
			// 	purpose: "When the Hotjar script executes we try to determine the most generic cookie path we should use, instead of the page hostname. This is done so that cookies can be shared across subdomains (where applicable). To determine this, we try to store the _hjTLDTest cookie for different URL substring alternatives until it fails. After this check, the cookie is removed."
			// },
			// {
			// 	name: "_hjUserAttributesHash",
			// 	expiry: "Session",
			// 	content: "Hash",
			// 	purpose: "User Attributes sent through the Hotjar Identify API are cached for the duration of the session in order to know when an attribute has changed and needs to be updated."
			// },
			// {
			// 	name: "_hjLocalStorageTest",
			// 	expiry: "Under 100ms",
			// 	content: "true/false",
			// 	purpose: "This cookie is used to check if the Hotjar Tracking Script can use local storage. If it can, a value of 1 is set in this cookie. The data stored in_hjLocalStorageTest has no expiration time, but it is deleted almost immediately after it is created."
			// },
			// {
			// 	name: "_hjIncludedInPageviewSample",
			// 	expiry: "30 minutes",
			// 	content: "true/false",
			// 	purpose: "This cookie is set to let Hotjar know whether that visitor is included in the data sampling defined by your site's pageview limit."
			// },
			// {
			// 	name: "_hjIncludedInSessionSample",
			// 	expiry: "30 minutes",
			// 	content: "true/false",
			// 	purpose: "This cookie is set to let Hotjar know whether that visitor is included in the data sampling defined by your site's daily session limit."
			// },
			// {
			// 	name: "_hjAbsoluteSessionInProgress",
			// 	expiry: "30 Minutes",
			// 	content: "true/false",
			// 	purpose: "This cookie is used to detect the first pageview session of a user. This is a True/False flag set by the cookie."
			// },
			// {
			// 	name: "_hjFirstSeen",
			// 	expiry: "Session",
			// 	content: "true/false",
			// 	purpose: "This is set to identify a new user’s first session. It stores a true/false value, indicating whether this was the first time Hotjar saw this user. It is used by Recording filters to identify new user sessions."
			// },
			// {
			// 	name: "_hjViewportId",
			// 	expiry: "Session",
			// 	content: "UUID",
			// 	purpose: "This stores information about the user viewport such as size and dimensions."
			// },
			// {
			// 	name: "_hjRecordingEnabled",
			// 	expiry: "Session",
			// 	content: "true/false",
			// 	purpose: "This is added when a Recording starts and is read when the recording module is initialized to see if the user is already in a recording in a particular session."
			// },
		]
	},
	// {
	// 	title: "Marketing cookies",
	// 	key: "Marketing",
	// 	intro: "In addition, the following marketing cookies are set. These can be declined when surfing on <a href=\"www.themasterchannel.com\">www.themasterchannel.com</a> as well. We use them to serve you with more relevant advertisements after visiting the website.",
	// 	toggleable: true,
	// 	cookies: [
	// 		{
	// 			name: "_lfa",
	// 			expiry: "2 years",
	// 			content: "Leadfeeder",
	// 			purpose: "This cookie will help us to identify which companies visit our website so we can offer them access to the platform."
	// 		},
	// 		{
	// 			name: "_fbp",
	// 			expiry: "3 months",
	// 			content: "Facebook, third-party cookie",
	// 			purpose: "This cookie will help to deliver our advertising to people who have already visited our website when they are on Facebook or a digital platform powered by Facebook Advertising."
	// 		},
	// 		{
	// 			name: "bcookie",
	// 			expiry: "2 year",
	// 			content: "LinkedIn, third-party cookie",
	// 			purpose: "Used by the social networking service, LinkedIn, for tracking the use of embedded services. These are used to optimize the range of advertising on LinkedIn."
	// 		},
	// 		{
	// 			name: "bscookie",
	// 			expiry: "2 year",
	// 			content: "LinkedIn, third-party cookie",
	// 			purpose: "Used by the social networking service, LinkedIn, for tracking the use of embedded services. These are used to optimize the range of advertising on LinkedIn."
	// 		},
	// 		{
	// 			name: "lang",
	// 			expiry: "Session",
	// 			content: "LinkedIn, third-party cookie",
	// 			purpose: "Used by the social networking service, LinkedIn, for tracking the use of embedded services. These are used to optimize the range of advertising on LinkedIn."
	// 		},
	// 		{
	// 			name: "lidc",
	// 			expiry: "1 day",
	// 			content: "LinkedIn, third-party cookie",
	// 			purpose: "Used by the social networking service, LinkedIn, for tracking the use of embedded services."
	// 		},
	// 		{
	// 			name: "lissc",
	// 			expiry: "1 year",
	// 			content: "LinkedIn, third-party cookie",
	// 			purpose: "Used by the social networking service, LinkedIn, for tracking the use of embedded services. These are used to optimize the range of advertising on LinkedIn."
	// 		},
	// 		{
	// 			name: "UstchHistory",
	// 			expiry: "30 days",
	// 			content: "LinkedIn, third-party cookie",
	// 			purpose: "This cookie is used to track visitors so that more relevant ads can be presented based on the visitor's preferences."
	// 		},
	// 		{
	// 			name: "1P_JAR",
	// 			expiry: "1 month",
	// 			content: "Google, third-party cookie",
	// 			purpose: "This cookie is used to track visitors so that more relevant ads can be presented based on the visitor's preferences."
	// 		},
	// 		{
	// 			name: "IDE",
	// 			expiry: "1 year",
	// 			content: "DoubleClick, third-party cookie",
	// 			purpose: "This cookie carries out information about how the user uses our website and any advertising that the end-user may have seen before visiting our site."
	// 		},
	// 		{
	// 			name: "NID",
	// 			expiry: "6 months",
	// 			content: "Google, third-party cookie",
	// 			purpose: "This cookie is used by Google to track your search preferences."
	// 		},
	// 		{
	// 			name: "CONSENT",
	// 			expiry: "6 months",
	// 			content: "Google, third-party cookie",
	// 			purpose: "This cookie carries out information about how the end-user uses the website and any advertising that the end-user may have seen before visiting the said website."
	// 		},
	// 		{
	// 			name: "_gcl_au",
	// 			expiry: "3 months",
	// 			content: "Google, third-party cookie",
	// 			purpose: "This cookie is used by Google to store and track conversions"
	// 		}
	// 	]
	// },
];

export default cookieTypes;