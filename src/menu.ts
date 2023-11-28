export const dashboardPagesMenu = {
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: '/',
		icon: 'Dashboard',
		subMenu: null,
	}
};

export const demoPagesMenu = {

	eventPages: {
		id: 'events',
		text: 'Events',
		path: 'events',
		icon: 'Games',
		subMenu: {
			categories: {
				id:'categories',
				text: 'Categories',
				path: 'events/categories',
				icon: 'Terrain',
			},
			location: {
				id: 'location',
				text: 'Location',
				path: 'events/location',
				icon: 'Place',
			},
			eventDetails: {
				id: 'event-details',
				text: 'Event-Details',
				path: 'events/event-details',
				icon: 'Park',
			},
		},
	},
	ticketPages: {
		id: 'ticketPages',
		text: 'Tickets',
		path: 'ticketPages',
		icon: 'videogameAsset',
		subMenu: {
			ticketCategory: {
				id: 'ticketCategory',
				text: 'Ticket Category',
				path: 'ticketPages/ticketCategory',
				icon: 'Beenhere',
			},
			ticketLists: {
				id: 'ticketLists',
				text: 'Ticket Lists',
				path: 'ticketPages/ticketLists',
				icon: 'ConfirmationNumber',
			},
		},
	},
	assignEvents: {
		id: 'assignEvents',
		text: 'Assign Tickets',
		path: 'assignEvents',
		icon: 'AddLink',
	},
	reports: {
		id: 'reports',
		text: 'Reports',
		path: 'reports',
		icon: 'StackedBarChart',
		subMenu: {
			purchaseTransaction: {
				id: 'purchaseTransaction',
				text: 'Purchase Transaction',
				path: 'reports/purchaseTransaction',
				icon: 'AttachMoney',
			},
			ticketSalesReport: {
				id: 'ticketSalesReport',
				text: 'Ticket Sales Report',
				path: 'reports/ticketSalesReport',
				icon: 'AutoGraph',
			},
			redemptionReport: {
				id: 'redemptionReport',
				text: 'Redemption Report',
				path: 'reports/redemptionReport',
				icon: 'Moving',
			},
			failedScanReport: {
				id: 'failedScanReport',
				text: 'Failed Scan Report',
				path: 'reports/failedScanReport',
				icon: 'MoneyOff',
			},
		},
	},
	DataList: {
		id: 'DataList',
		text: 'Data List',
		path: 'dataList',
		icon: 'AutoStories',
		subMenu: {
			subscription: {
				id: 'subscription',
				text: 'Subscription',
				path: 'dataList/subscription',
				icon: 'Subject',
			},
			sponsor: {
				id: 'sponsor',
				text: 'Sponsor',
				path: 'dataList/sponsor',
				icon: 'MonetizationOn',
			},
			vendor: {
				id: 'vendor',
				text: 'Vendor',
				path: 'dataList/vendor',
				icon: 'Storefront',
			},
		},
	},
	Template:{
		id: 'Template',
		text: 'Template',
		path: 'template',
		icon: 'Widgets',
		subMenu: {
			pageList:{
				id: 'pageList',
				text: 'Page List',
				path: 'template/pageList',
				icon: 'MenuBook',
			},
		},
	},

};



