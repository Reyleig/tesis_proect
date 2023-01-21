import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UtilityService } from '../general/utility.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

describe('CategoryService', () => {
    let service: CategoryService;
    let categoryRepository: Repository<Category>;

    const mockCategoryNadoRepositoryFactory = jest.fn(() => ({
        find: jest.fn(entity => entity).mockResolvedValue({}),
        save: jest.fn(entity => entity).mockResolvedValue({}),
    }));


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoryController],

            providers: [
                CategoryService,
                UtilityService,
                {
                    provide: getRepositoryToken(Category),
                    useFactory: mockCategoryNadoRepositoryFactory,
                },
            ],
        }).compile();

        service = module.get<CategoryService>(CategoryService);
        categoryRepository = module.get<Repository<Category>>(getRepositoryToken(Category));

    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // async findAll() {
    //     let response = await this.categoryRepository.find();
    //     return await this.utilityService.serviceResponse(HttpStatus.OK, response);
    //   }
    it('should return an array of categories', async () => {
        categoryRepository.find = jest.fn().mockResolvedValue([{}, {}]);
        const result = await service.findAll();
        expect(result).not.toBe(null);
    }
    );
    
});