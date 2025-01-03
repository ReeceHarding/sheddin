import React from 'react';
import { ProcessStep } from './ProcessStep';
import { ProcessGlance } from './ProcessGlance';
import { ProcessFAQ } from './ProcessFAQ';

export const ProcessSections = () => {
  const siteVisitData = {
    id: 'site-visit',
    preTitle: 'Start with our Design Center',
    title: 'Site Visit',
    duration: '2+ Weeks',
    description: "When installation is purchased, we initiate communication with a contractor within Studio Shed's installation network. This contractor will come review your project on-site and with their input you will fill out an informational checklist. This document provides information necessary for the site work estimate and is required to inform Studio Shed's permit plan set.",
    image: '/images/process/secondHero.jpg',
    studioShedDeliverables: [
      'Introduction to Studio Shed Network Contractor'
    ],
    contractorDeliverables: {
      items: [
        'Site Visit Permitted Checklist',
        "Answer Customer's Pre-Construction Questions",
        'Estimate for Scope Outside of Studio Shed Kit'
      ],
      subitems: [
        {
          title: 'Site Visit Permitted Checklist includes:',
          items: [
            'Existing and proposed utilities',
            'Foundation type and project scope',
            'Building use and interior layout',
            'HVAC and water heater details',
            'Photos of build site (with utility locates marked)'
          ]
        },
        {
          title: 'Estimate for Scope Outside of Studio Shed Kit includes:',
          items: [
            'Foundation',
            'Site Work',
            'Deck',
            'Other'
          ]
        }
      ]
    },
    customerDeliverables: [
      'Providing access to site',
      'Providing needed information',
      'Verifying project is possible through building department or HOA'
    ]
  };

  const designCoordinationData = {
    id: 'design-coordination',
    preTitle: 'Order Placement & Deposit',
    preSubtitle: '1st Payment',
    title: 'Design Coordination',
    duration: '2+ Weeks',
    description: "Studio Shed's Design Coordinator prepares your site plan, floor plan, and elevations based on your configuration and the site visit. We share this Coordination Set with you for final approval then include them in the contract.",
    image: '/images/process/designCoordination.png',
    studioShedDeliverables: [
      'Exterior Shell Design and Colors',
      'Floor Plan and Interior Layout',
      'Local Energy Compliance',
      'Proposed Site Plan'
    ],
    contractorDeliverables: {
      items: [],
      subitems: []
    },
    customerDeliverables: [
      'Approve Design',
      'Sign Contract'
    ]
  };

  const projectDesignData = {
    id: 'project-design',
    preTitle: 'Approved Coordination Set & Contract',
    preSubtitle: '2nd Payment',
    title: 'Project Design',
    duration: '4+ Weeks',
    description: "Studio Shed's Project Designer works with our 3rd party Structural Engineer to prepare your unique Permit and Construction documents based on your configuration and local design criteria.",
    image: '/images/process/projectDesign.jpg',
    studioShedDeliverables: [
      'Site plan',
      'Design sections and details',
      'Electrical schematic',
      'Roof and wall framing plans',
      'Structural sections and details',
      'Energy calculations',
      'Floor plans',
      'Elevations',
      'Foundation plan',
      'Structural design criteria',
      'Structural calculations'
    ],
    contractorDeliverables: {
      items: [],
      subitems: []
    },
    customerDeliverables: [
      'Submit to the authority having jurisdiction'
    ]
  };

  const permittingData = {
    id: 'permitting',
    preTitle: 'Permit Plan Set Delivered',
    preSubtitle: '3rd Payment',
    title: 'Permitting',
    duration: '4-12 Weeks',
    description: "Your local building department's plan review timeline can vary greatly. We often recommend engaging the planning department early on in the project to make sure there are not unforeseen hurdles in their process. Your Project Manager and Project Designer are available to address any comments or concerns from the building department after they review the plans.",
    image: '/images/process/permitting.jpg',
    studioShedDeliverables: [
      'Revisions if required',
      'Itemized response letter',
      'Communication with authority having jurisdiction as required to resolve any concerns'
    ],
    contractorDeliverables: {
      items: [],
      subitems: []
    },
    customerDeliverables: [
      'Submit to the authority having jurisdiction'
    ]
  };

  const scopeCallAndProductionData = {
    id: 'production',
    preTitle: 'Permit Issued',
    preSubtitle: 'Final Payment',
    title: 'Scope Call & Production',
    duration: '2-4 Weeks',
    description: "Studio Shed's Project Manager (PM) approved plans (Coordination Set) based on your configuration and the site visit. The PM schedules a Scope call with designated installer and timeline to shipout and installation discussed.",
    image: '/images/process/scopeCallAndProduction.png',
    studioShedDeliverables: [
      'Schedule scope call',
      'Schedule production date',
      'Review of custom/special considerations – i.e. windows, glazing, inspections, etc.',
      'Answer any outstanding questions you may have about your project prior to delivery and construction.'
    ],
    contractorDeliverables: {
      items: [],
      subitems: []
    },
    customerDeliverables: [
      'Scope call',
      'Questions for the Studio Shed team',
      'Desired construction timeline'
    ]
  };

  const installationData = {
    id: 'installation',
    preTitle: 'Delivery',
    preSubtitle: 'Scheduled with Customer',
    title: 'Installation',
    duration: '1-2 Weeks',
    description: "Once the unit ships, you will have 30 days of free local storage to coordinate delivery to your site. If your site is ready for construction and you have coordinated with your contractor, installation can begin as soon as you receive delivery. Your Project Manager is your best resource to assist in answering install related questions as the unit is being built.",
    image: '/images/process/installation.jpg',
    studioShedDeliverables: [
      'Support Network Contractor or DIY installation by phone and email as needed',
      'Provide applicable project and installation materials to support a successful project',
      'Provide support and solutions for any material damaged upon receipt or warranty claims',
      'Provide all applicable warranty documents',
      'Final Contract and supporting documents'
    ],
    contractorDeliverables: {
      items: [
        'Hand off-load the unit from semi-trailer to job site',
        'On-site assembly',
        'Coordination and completion of on-site inspections'
      ],
      subitems: []
    },
    customerDeliverables: [
      'Permit card and any related documents from the building department or inspectors',
      'Site access',
      "Proactive questions to avoid 'fire drills' while building",
      'Cost of special inspections or other 3rd party requirements',
      'Written verification of HOA approval',
      'Access for delivery'
    ]
  };

  return (
    <div>
      <ProcessStep {...siteVisitData} index={0} />
      <ProcessStep {...designCoordinationData} index={1} />
      <ProcessStep {...projectDesignData} index={2} />
      <ProcessStep {...permittingData} index={3} />
      <ProcessStep {...scopeCallAndProductionData} index={4} />
      <ProcessStep {...installationData} index={5} />
      <div id="process-glance">
        <ProcessGlance />
      </div>
      <ProcessFAQ />
    </div>
  );
};