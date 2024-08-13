# Front End Software Engineer Challenge

## Context

Assets are essential for the operation of an industry and can include anything from manufacturing equipment to transportation vehicles and energy generation systems. Proper management and maintenance are crucial to ensure they continue operating efficiently and effectively. A practical way to visualize the hierarchy of assets is through a tree structure.

## Challenge

📌 **Develop a tree visualization application that displays the companies' assets.**  
_(The tree is primarily composed of components, assets, and locations)_

### Data Structure

- **Components:** Parts that constitute an asset. They can be associated with an asset or a location. Components typically include **vibration** or **energy** sensors and have a status of **operation** or **alert**.
- **Assets/Sub-Assets:** Assets that can contain other assets or components as children. They can be associated with a location but may also exist without a defined location.
- **Locations/Sub-Locations:** Represent the places where assets are located. For large locations, it may be necessary to divide them to keep the hierarchy more organized.

The tree can be visually represented as follows:

```
- ROOT
  ├── Location A
  |     ├── Asset 1
  |     |     ├── Component A1
  |     |     ├── Component A2
  ├── Location B
  |     ├── Sub-Location B1
  |           ├── Asset 2
```

## Design

The design of the application can be viewed on [Figma](https://www.figma.com/file/F52Yv8RmGoGOYcV9CiuIZ1/%5BCareers%5D-Frontend-Challenge-v2?type=design&node-id=0-1&mode=design&t=r3n2A4W0ZFUwVjAs-0).

## Demonstration

Below, you can check out a demonstration video that shows the application opening for each company and selecting filters:

[Watch the demo video here](https://drive.google.com/file/d/1x-SzIxHGi1IsG7Uhy_YqIYu_mxYXmynt/view)

## Improvement Points

If there were more time to refine the project, the following aspects would be prioritized:

1. **Optimization of Item Listing:** Improve the item listing by applying filters that limit the number of items displayed simultaneously. This would help reduce the load on the interface, especially in situations with large volumes of data, resulting in a smoother and more responsive user experience.

2. **Asynchronous Data Loading:** Implement asynchronous loading to load data on-demand as the user expands the tree nodes. This would reduce the initial loading time and make the application more performance-efficient.
