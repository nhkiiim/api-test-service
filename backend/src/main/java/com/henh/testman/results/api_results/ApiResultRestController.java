package com.henh.testman.results.api_results;

import com.henh.testman.common.errors.NotFoundException;
import com.henh.testman.common.utils.ApiUtils.ApiResult;
import com.henh.testman.results.api_results.request.ApiInsertReq;
import com.henh.testman.results.api_results.response.ApiDeleteRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.henh.testman.common.utils.ApiUtils.success;

@RestController
@RequestMapping("api/api-result")
public class ApiResultRestController {

    private final ApiResultService apiResultService;

    @Autowired
    public ApiResultRestController(ApiResultService apiResultService) {
        this.apiResultService = apiResultService;
    }


    @PostMapping("{tabSeq}")
    public ApiResult<ApiResultDto> insertApi(@RequestBody ApiInsertReq apiInsertReq) {
        return success(
                apiResultService.insertApi(apiInsertReq)
                        .map(ApiResultDto::new)
                        .orElseThrow(() -> new NotFoundException("fail select for load"))

        );
    }

    @DeleteMapping("{tabSeq}")
    public ApiResult<ApiDeleteRes> deleteApi(@PathVariable Long tabSeq) {
        return success(
                new ApiDeleteRes(
                        apiResultService.deleteApi(tabSeq)
                )
        );
    }

}
