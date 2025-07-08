from django.core.management.base import BaseCommand
from sdg_app.models import SDGGoal, SDGTarget, SDGIndicator, Country, Province, City, SDGData
import random

class Command(BaseCommand):
    help = 'Populate database with sample SDG data'

    def handle(self, *args, **options):
        self.stdout.write('Creating SDG Goals...')
        self.create_sdg_goals()
        
        self.stdout.write('Creating Countries, Provinces, and Cities...')
        self.create_locations()
        
        self.stdout.write('Creating SDG Targets and Indicators...')
        self.create_targets_and_indicators()
        
        self.stdout.write('Creating sample data...')
        self.create_sample_data()
        
        self.stdout.write(self.style.SUCCESS('Successfully populated database!'))

    def create_sdg_goals(self):
        sdg_goals = [
            {
                'goal_number': 1,
                'title': 'No Poverty',
                'description': 'End poverty in all its forms everywhere',
                'color': '#E5243B'
            },
            {
                'goal_number': 2,
                'title': 'Zero Hunger',
                'description': 'End hunger, achieve food security and improved nutrition and promote sustainable agriculture',
                'color': '#DDA63A'
            },
            {
                'goal_number': 3,
                'title': 'Good Health and Well-being',
                'description': 'Ensure healthy lives and promote well-being for all at all ages',
                'color': '#4C9F38'
            },
            {
                'goal_number': 4,
                'title': 'Quality Education',
                'description': 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all',
                'color': '#C5192D'
            },
            {
                'goal_number': 5,
                'title': 'Gender Equality',
                'description': 'Achieve gender equality and empower all women and girls',
                'color': '#FF3A21'
            },
            {
                'goal_number': 6,
                'title': 'Clean Water and Sanitation',
                'description': 'Ensure availability and sustainable management of water and sanitation for all',
                'color': '#26BDE2'
            },
            {
                'goal_number': 7,
                'title': 'Affordable and Clean Energy',
                'description': 'Ensure access to affordable, reliable, sustainable and modern energy for all',
                'color': '#FCC30B'
            },
            {
                'goal_number': 8,
                'title': 'Decent Work and Economic Growth',
                'description': 'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all',
                'color': '#A21942'
            },
            {
                'goal_number': 9,
                'title': 'Industry, Innovation and Infrastructure',
                'description': 'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation',
                'color': '#FD6925'
            },
            {
                'goal_number': 10,
                'title': 'Reduced Inequalities',
                'description': 'Reduce inequality within and among countries',
                'color': '#DD1367'
            },
            {
                'goal_number': 11,
                'title': 'Sustainable Cities and Communities',
                'description': 'Make cities and human settlements inclusive, safe, resilient and sustainable',
                'color': '#FD9D24'
            },
            {
                'goal_number': 12,
                'title': 'Responsible Consumption and Production',
                'description': 'Ensure sustainable consumption and production patterns',
                'color': '#BF8B25'
            },
            {
                'goal_number': 13,
                'title': 'Climate Action',
                'description': 'Take urgent action to combat climate change and its impacts',
                'color': '#3F7E44'
            },
            {
                'goal_number': 14,
                'title': 'Life Below Water',
                'description': 'Conserve and sustainably use the oceans, seas and marine resources for sustainable development',
                'color': '#0A97D9'
            },
            {
                'goal_number': 15,
                'title': 'Life on Land',
                'description': 'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss',
                'color': '#56C02B'
            },
            {
                'goal_number': 16,
                'title': 'Peace, Justice and Strong Institutions',
                'description': 'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels',
                'color': '#00689D'
            },
            {
                'goal_number': 17,
                'title': 'Partnerships for the Goals',
                'description': 'Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development',
                'color': '#19486A'
            }
        ]
        
        for goal_data in sdg_goals:
            goal, created = SDGGoal.objects.get_or_create(
                goal_number=goal_data['goal_number'],
                defaults=goal_data
            )
            if created:
                self.stdout.write(f'Created SDG {goal.goal_number}: {goal.title}')

    def create_locations(self):
        countries_data = [
            {
                'name': 'Pakistan',
                'iso_code': 'PAK',
                'region': 'South Asia',
                'income_group': 'Lower middle income',
                'population': 230000000,
                'provinces': [
                    {
                        'name': 'Punjab',
                        'code': 'PB',
                        'population': 110000000,
                        'cities': ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala']
                    },
                    {
                        'name': 'Sindh',
                        'code': 'SD',
                        'population': 48000000,
                        'cities': ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana']
                    },
                    {
                        'name': 'Khyber Pakhtunkhwa',
                        'code': 'KP',
                        'population': 35000000,
                        'cities': ['Peshawar', 'Mardan', 'Mingora', 'Kohat']
                    },
                    {
                        'name': 'Balochistan',
                        'code': 'BA',
                        'population': 12000000,
                        'cities': ['Quetta', 'Gwadar', 'Turbat', 'Khuzdar']
                    }
                ]
            },
            {
                'name': 'India',
                'iso_code': 'IND',
                'region': 'South Asia',
                'income_group': 'Lower middle income',
                'population': 1400000000,
                'provinces': [
                    {
                        'name': 'Maharashtra',
                        'code': 'MH',
                        'population': 112000000,
                        'cities': ['Mumbai', 'Pune', 'Nagpur', 'Nashik']
                    },
                    {
                        'name': 'Uttar Pradesh',
                        'code': 'UP',
                        'population': 200000000,
                        'cities': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi']
                    },
                    {
                        'name': 'West Bengal',
                        'code': 'WB',
                        'population': 91000000,
                        'cities': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol']
                    }
                ]
            },
            {
                'name': 'Bangladesh',
                'iso_code': 'BGD',
                'region': 'South Asia',
                'income_group': 'Lower middle income',
                'population': 165000000,
                'provinces': [
                    {
                        'name': 'Dhaka Division',
                        'code': 'DH',
                        'population': 36000000,
                        'cities': ['Dhaka', 'Narayanganj', 'Gazipur', 'Tangail']
                    },
                    {
                        'name': 'Chittagong Division',
                        'code': 'CH',
                        'population': 28000000,
                        'cities': ['Chittagong', 'Comilla', 'Brahmanbaria']
                    }
                ]
            }
        ]
        
        for country_data in countries_data:
            provinces = country_data.pop('provinces', [])
            country, created = Country.objects.get_or_create(
                name=country_data['name'],
                defaults=country_data
            )
            if created:
                self.stdout.write(f'Created country: {country.name}')
            
            for province_data in provinces:
                cities = province_data.pop('cities', [])
                province, created = Province.objects.get_or_create(
                    country=country,
                    name=province_data['name'],
                    defaults=province_data
                )
                if created:
                    self.stdout.write(f'  Created province: {province.name}')
                
                for city_name in cities:
                    city, created = City.objects.get_or_create(
                        province=province,
                        name=city_name,
                        defaults={
                            'population': random.randint(500000, 15000000),
                            'is_capital': city_name in ['Islamabad', 'New Delhi', 'Dhaka']
                        }
                    )
                    if created:
                        self.stdout.write(f'    Created city: {city.name}')

    def create_targets_and_indicators(self):
        # Sample targets and indicators for first few SDGs
        targets_data = [
            # SDG 1 - No Poverty
            {
                'sdg_number': 1,
                'targets': [
                    {
                        'number': '1.1',
                        'title': 'Eradicate extreme poverty',
                        'description': 'By 2030, eradicate extreme poverty for all people everywhere',
                        'indicators': [
                            {
                                'code': '1.1.1',
                                'title': 'Proportion of population below international poverty line',
                                'unit': 'Percentage',
                                'source': 'World Bank'
                            }
                        ]
                    },
                    {
                        'number': '1.2',
                        'title': 'Reduce poverty by half',
                        'description': 'By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty',
                        'indicators': [
                            {
                                'code': '1.2.1',
                                'title': 'Proportion of population living below national poverty lines',
                                'unit': 'Percentage',
                                'source': 'National Statistics'
                            }
                        ]
                    }
                ]
            },
            # SDG 3 - Good Health and Well-being
            {
                'sdg_number': 3,
                'targets': [
                    {
                        'number': '3.1',
                        'title': 'Reduce maternal mortality',
                        'description': 'By 2030, reduce the global maternal mortality ratio',
                        'indicators': [
                            {
                                'code': '3.1.1',
                                'title': 'Maternal mortality ratio',
                                'unit': 'Deaths per 100,000 live births',
                                'source': 'WHO'
                            }
                        ]
                    },
                    {
                        'number': '3.2',
                        'title': 'End preventable deaths of children',
                        'description': 'By 2030, end preventable deaths of newborns and children under 5 years of age',
                        'indicators': [
                            {
                                'code': '3.2.1',
                                'title': 'Under-five mortality rate',
                                'unit': 'Deaths per 1,000 live births',
                                'source': 'UNICEF'
                            }
                        ]
                    }
                ]
            },
            # SDG 4 - Quality Education
            {
                'sdg_number': 4,
                'targets': [
                    {
                        'number': '4.1',
                        'title': 'Free primary and secondary education',
                        'description': 'By 2030, ensure that all girls and boys complete free, equitable and quality primary and secondary education',
                        'indicators': [
                            {
                                'code': '4.1.1',
                                'title': 'Proportion of children achieving minimum proficiency in reading and mathematics',
                                'unit': 'Percentage',
                                'source': 'UNESCO'
                            }
                        ]
                    }
                ]
            }
        ]
        
        for target_group in targets_data:
            sdg = SDGGoal.objects.get(goal_number=target_group['sdg_number'])
            
            for target_data in target_group['targets']:
                indicators = target_data.pop('indicators', [])
                target, created = SDGTarget.objects.get_or_create(
                    sdg_goal=sdg,
                    target_number=target_data['number'],
                    defaults=target_data
                )
                if created:
                    self.stdout.write(f'Created target: {target.target_number}')
                
                for indicator_data in indicators:
                    indicator, created = SDGIndicator.objects.get_or_create(
                        target=target,
                        indicator_code=indicator_data['code'],
                        defaults={
                            'title': indicator_data['title'],
                            'description': indicator_data['title'],
                            'unit_of_measurement': indicator_data['unit'],
                            'data_source': indicator_data['source']
                        }
                    )
                    if created:
                        self.stdout.write(f'  Created indicator: {indicator.indicator_code}')

    def create_sample_data(self):
        indicators = SDGIndicator.objects.all()
        countries = Country.objects.all()
        years = list(range(2015, 2024))
        
        data_count = 0
        for indicator in indicators:
            for country in countries:
                # Create national level data
                for year in years:
                    value = self.generate_sample_value(indicator.indicator_code, year)
                    
                    SDGData.objects.get_or_create(
                        indicator=indicator,
                        country=country,
                        year=year,
                        defaults={
                            'value': value,
                            'data_source': indicator.data_source,
                            'quality_score': random.randint(3, 8),
                            'is_estimate': random.choice([True, False])
                        }
                    )
                    data_count += 1
                
                # Create some provincial level data
                provinces = country.provinces.all()[:2]  # First 2 provinces
                for province in provinces:
                    for year in years[-3:]:  # Last 3 years only
                        value = self.generate_sample_value(indicator.indicator_code, year)
                        
                        SDGData.objects.get_or_create(
                            indicator=indicator,
                            country=country,
                            province=province,
                            year=year,
                            defaults={
                                'value': value,
                                'data_source': f'{indicator.data_source} - Provincial',
                                'quality_score': random.randint(3, 7),
                                'is_estimate': True
                            }
                        )
                        data_count += 1
        
        self.stdout.write(f'Created {data_count} data points')

    def generate_sample_value(self, indicator_code, year):
        """Generate realistic sample values based on indicator type"""
        base_year = 2015
        progress = (year - base_year) / 8  # 8 years total
        
        if '1.1.1' in indicator_code or '1.2.1' in indicator_code:  # Poverty rates
            base_value = random.uniform(15, 35)
            # Poverty should decrease over time
            return max(1, base_value - (progress * random.uniform(5, 15)))
        
        elif '3.1.1' in indicator_code:  # Maternal mortality
            base_value = random.uniform(100, 300)
            # Should decrease over time
            return max(10, base_value - (progress * random.uniform(20, 80)))
        
        elif '3.2.1' in indicator_code:  # Under-five mortality
            base_value = random.uniform(30, 80)
            # Should decrease over time
            return max(5, base_value - (progress * random.uniform(10, 30)))
        
        elif '4.1.1' in indicator_code:  # Education proficiency
            base_value = random.uniform(40, 70)
            # Should increase over time
            return min(95, base_value + (progress * random.uniform(5, 20)))
        
        else:
            # Generic indicator - random improvement
            base_value = random.uniform(20, 80)
            change = random.uniform(-10, 15) * progress
            return max(0, min(100, base_value + change))