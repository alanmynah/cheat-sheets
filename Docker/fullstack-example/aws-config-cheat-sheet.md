# AWS Configuration Cheat Sheet

This cheat-sheet is pointless without a course. Please get the course first.

Taken straight from https://www.udemy.com/docker-and-kubernetes-the-complete-guide/learn/lecture/15435906#content

This lecture note is not intended to be a replacement for the videos, but only to serve as a cheat sheet for students who want to quickly run thru the AWS configuration steps or easily see if they missed a step. Steps listed are accurate as of 7-11-2019, keep in mind that AWS makes frequent small changes to their UI.

RDS Database Creation

Go to AWS Management Console and use Find Services to search for RDS

Click Create database button

Select PostgreSQL

Check 'only enable options eligible for RDS Free Usage Tier' and click Next button

Scroll down to Settings Form

Set DB Instance identifier to fullstack-example-postgres

Set Master Username to postgres

Set Master Password to postgres and confirm

Click Next button

Make sure VPC is set to Default VPC

Scroll down to Database Options

Set Database Name to fibvalues

Scroll down and click Create Database button

ElastiCache Redis Creation

Go to AWS Management Console and use Find Services to search for ElastiCache

Click Redis in sidebar

Click the Create button

Make sure Redis is set as Cluster Engine

In Redis Settings form, set Name to fullstack-example-redis

Change Node type to 'cache.t2.micro'

Change Number of replicas to 0

Scroll down to Advanced Redis Settings

Subnet Group should say “Create New"

Set Name to redis-group

VPC should be set to default VPC

Tick all subnet’s boxes

Scroll down and click Create button

Creating a Custom Security Group

Go to AWS Management Console and use Find Services to search for VPC

Click Security Groups in sidebar

Click Create Security Group button

Set Security group name to fullstack-example

Set Description to fullstack-example

Set VPC to default VPC

Click Create Button

Click Close

Manually tick the empty field in the Name column of the new security group and type fullstack-example, then click the checkmark icon.

Scroll down and click Inbound Rules

Click Edit Rules button

Click Add Rule

Set Port Range to 5432-6379

Click in box next to Custom and start typing 'sg' into the box. Select the Security Group you just created, it should look similar to 'sg-…. | fullstack-example’

Click Save Rules button

Click Close

Applying Security Groups to ElastiCache

Go to AWS Management Console and use Find Services to search for ElastiCache

Click Redis in Sidebar

Check box next to Redis cluster and click Modify

Change VPC Security group to the fullstack-example group and click Save

Click Modify

Applying Security Groups to RDS

Go to AWS Management Console and use Find Services to search for RDS

Click Databases in Sidebar and check box next to your instance

Click Modify button

Scroll down to Network and Security change Security group to fullstack-example

Scroll down and click Continue button

Click Modify DB instance button

Applying Security Groups to Elastic Beanstalk

Go to AWS Management Console and use Find Services to search for Elastic Beanstalk

Click the fullstack-example application tile

Click Configuration link in Sidebar

Click Modify in Instances card

Scroll down to EC2 Security Groups and tick box next to fullstack-example

Click Apply and Click Confirm

Setting Environment Variables

Go to AWS Management Console and use Find Services to search for Elastic Beanstalk

Click the fullstack-example application tile

Click Configuration link in Sidebar

Select Modify in the Software tile

Scroll down to Environment properties

In another tab Open up ElastiCache, click Redis and check the box next to your cluster. Find the Primary Endpoint and copy that value but omit the :6379

Set REDIS_HOST key to the primary endpoint listed above, remember to omit :6379

Set REDIS_PORT to 6379

Set PGUSER to postgres

Set PGPASSWORD to postgrespassword

In another tab, open up RDS dashboard, click databases in sidebar, click your instance and scroll to Connectivity and Security. Copy the endpoint.

Set the PGHOST key to the endpoint value listed above.

Set PGDATABASE to fibvalues

Set PGPORT to 5432

Click Apply button

IAM Keys for Deployment

Go to AWS Management Console and use Find Services to search for IAM

Click Users link in the Sidebar

Click Add User button

Set User name to fullstack-example-deployer

Set Access-type to Programmatic Access

Click Next:Permissions button

Select Attach existing polices directly button

Search for 'beanstalk' and check all boxes

Click Next:Review

Add tag if you want and Click Next:Review

Click Create User

Copy Access key ID and secret access key for use later

AWS Keys in Travis

Open up Travis dashboard and find your fullstack-example app

Click More Options, and select Settings

Scroll to Environment Variables

Add AWS_ACCESS_KEY and set to your AWS access key

Add AWS_SECRET_KEY and set to your AWS secret key
